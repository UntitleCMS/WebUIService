import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { CodeModel } from '../../../core/tools/code-model';

import * as monaco from 'monaco-editor';
import { Terminal } from 'xterm';
import { Subscription } from 'rxjs';
import { Runner } from '../../../socket/runner';
import loader from '@monaco-editor/loader';
import { FitAddon } from 'xterm-addon-fit';
import { ToastService } from '../../../core/services/toast.service';

enum State {
  LOADING,
  READY,
  ABORTED,
  RUNNING,
}

@Component({
  selector: 'app-code-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-page.component.html',
  styleUrl: './code-page.component.scss',
})
export class CodePageComponent {
  @Input() code!: CodeModel;
  @Output() closeCommand = new EventEmitter();

  @ViewChild('codeEditor') codeEditorRef!: ElementRef<HTMLElement>;
  @ViewChild('terminal') terminalRef!: ElementRef<HTMLElement>;

  monacoEditor!: monaco.editor.IStandaloneCodeEditor;
  terminal!: Terminal;

  serverStatus: State.LOADING | State.READY = State.LOADING;
  executeStatus: State.READY | State.LOADING | State.RUNNING = State.READY;
  exitStatus: State.LOADING | State.ABORTED = State.ABORTED;

  get state() {
    return State;
  }

  subscriptions = new Subscription();

  prompt = '';
  inputBuffer = '';

  quota = signal('');

  constructor(private runner: Runner, private toastService: ToastService) {}

  ngOnInit() {
    this.runner.connect();
    this.listenServerStatus();
  }

  ngAfterViewInit() {
    loader.init().then((monaco) => {
      this.monacoEditor = monaco.editor.create(
        this.codeEditorRef.nativeElement,
        {
          value: this.code.code,
          language: this.code.language,
          automaticLayout: true,
          minimap: {
            enabled: window.innerWidth >= 1024,
          },
        }
      );

      this.monacoEditor.getModel()?.onDidChangeContent((e) => {
        const loc = this.monacoEditor.getModel()!.getLineCount();
        if (loc > 200) {
          let diff = loc - 200;
          let range = {
            startLineNumber: loc - diff + 1,
            startColumn: 1,
            endLineNumber: loc,
            endColumn: this.monacoEditor.getModel()!.getLineMaxColumn(loc),
          };
          this.monacoEditor.getModel()!.applyEdits([{ range, text: '' }]);
        }
      });

      this.monacoEditor.addAction({
        id: 'run',
        label: 'Run Code',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        contextMenuGroupId: 'navigation',
        run: () => this.execute(),
      });
    });

    const fitAddon = new FitAddon();
    this.terminal = new Terminal({
      convertEol: true,
      cursorBlink: true,
    });

    this.terminal.loadAddon(fitAddon);
    this.terminal.open(this.terminalRef.nativeElement);
    fitAddon.fit();

    this.terminal.write(this.prompt);

    this.terminal.onData((input) => {
      if (input === '\r') {
        this.terminal.writeln('');
        //Waiting for input event
        this.useInputBuffer();
        this.terminal.write(this.prompt);
      } else if (input === '\u007f') {
        if (this.terminal.buffer.active.cursorX > 0) {
          this.terminal.write('\b \b');
          this.inputBuffer = this.inputBuffer.slice(0, -1);
        }
      } else {
        this.terminal.write(input);
        //store buffer
        this.inputBuffer += input;
      }
    });

    this.checkServerStatus();
    this.listenError();
    this.listenOutput();
    this.listenReport();
    this.listenQuotaConsume();
  }

  ngOnDestroy(): void {
    if (this.monacoEditor) {
      this.monacoEditor.dispose();
    }
    this.subscriptions.unsubscribe();
  }

  private listenServerStatus() {
    const connectStatus = this.runner.isConnected$.subscribe((status) => {
      this.serverStatus = status ? State.READY : State.LOADING;
    });
    this.subscriptions.add(connectStatus);
  }

  private checkServerStatus() {
    const connectStatus = this.runner.isConnected$.subscribe(() => {
      if (this.serverStatus === State.READY) {
        this.terminal.clear();
        this.terminal.writeln('Server is ready');
      } else this.terminal.writeln('Connecting to server...');
    });
    this.subscriptions.add(connectStatus);
  }

  private listenOutput() {
    const output = this.runner.output$.subscribe((stdout) => {
      this.executeStatus = State.RUNNING;

      if (stdout.data && stdout.type !== 'exit') {
        this.terminal.write(stdout.data);
      }
      if (stdout.type === 'exit') {
        this.terminal.write('\nExit with status code ' + stdout.data);
        this.terminal.writeln(this.prompt);
        this.runner.kill();
        this.executeStatus = this.state.READY;
        this.exitStatus = this.state.ABORTED;
      }
      this.terminal.write(this.prompt);
    });
    this.subscriptions.add(output);
  }

  private listenError() {
    const error = this.runner.error$.subscribe({
      next: (codeErr) => {
        console.error(codeErr);
        this.executeStatus = State.READY;
        this.toastService.push({
          title: codeErr,
          icon: 'warning',
          type: 'error',
        });
      },
    });
    this.subscriptions.add(error);
  }

  private listenReport() {
    const report = this.runner.report$.subscribe({
      next: (rep) => {
        this.quota.set(rep);
      },
    });
    this.subscriptions.add(report);
  }

  private listenQuotaConsume() {
    const quotaConsume = this.runner.quotaConsume$.subscribe({
      next: () => {
        this.toastService.push({
          title: 'คุณใช้ 1 โควตา',
          icon: 'info',
          type: 'success',
        });
      },
    });
    this.subscriptions.add(quotaConsume);
  }

  private mapSupportedLanguages(lang: string) {
    switch (lang) {
      case 'python':
        return 'python3';
      case 'java':
        return 'java17';
      case 'c':
        return 'c12';
      default:
        return 'unsupported';
    }
  }

  execute() {
    if (this.executeStatus == this.state.RUNNING) {
      this.abort();
    }
    this.executeStatus = State.LOADING;
    this.terminal.clear();
    this.runner.run({
      language: this.mapSupportedLanguages(this.code.language),
      sourcecode: this.monacoEditor.getValue(),
    });
  }

  abort() {
    this.exitStatus = State.LOADING;
    this.runner.kill();
  }

  closePage() {
    this.abort();
    this.closeCommand.emit();
  }

  useInputBuffer() {
    console.log(this.inputBuffer.concat('\n'));
    this.runner.input(this.inputBuffer.concat('\n'));
    this.inputBuffer = '';
  }
}
