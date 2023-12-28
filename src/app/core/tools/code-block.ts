import {
  API,
  BlockAPI,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
} from '@editorjs/editorjs';

import loader from '@monaco-editor/loader';
import * as editor from 'monaco-editor/esm/vs/editor/editor.api';

import { Language, availableLanguages } from './available-language';
import { CodeModel } from './code-model';

interface CodeBlockData extends CodeModel, BlockToolData {}

export interface CodeBlockConfig {
  name: string;
  event: (data: CodeModel) => void;
}

export default class CodeBlock implements BlockTool {
  api: API;
  readOnly: boolean;
  config?: CodeBlockConfig;
  block: BlockAPI;
  data: CodeBlockData = {
    name: '',
    language: 'c',
    code: '',
  };

  previousValue = '';

  _wrapper!: HTMLDivElement;
  _option!: HTMLDivElement;
  _editor!: HTMLDivElement;

  _configWrapper!: HTMLDivElement;
  _filenameInput!: HTMLInputElement;
  _languageSelector!: HTMLSelectElement;
  _runButton!: HTMLButtonElement;

  ieditor!: typeof editor.editor;
  monacoEditor!: editor.editor.IStandaloneCodeEditor;

  constructor({
    api,
    readOnly,
    data,
    config,
    block,
  }: BlockToolConstructorOptions<CodeBlockData, CodeBlockConfig>) {
    this.api = api;
    this.readOnly = readOnly;
    this.config = config;
    this.block = block!;
    if (data && data.language) this.data = data;
    this._wrapper = this.drawView();
  }

  save() {
    const lang = this.monacoEditor.getModel()?.getLanguageId()!;
    return {
      language: lang,
      code: this.monacoEditor.getValue(),
      name: this.data.name || 'untitled',
    } as CodeModel;
  }

  render() {
    return this._wrapper;
  }

  private loadEditor() {
    loader.init().then((monaco) => {
      this.ieditor = monaco.editor;
      this.monacoEditor = this.ieditor.create(this._editor, {
        value: this.data.code || '',
        language: this.data.language,
        theme: this.data.theme || 'vs',
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
      });
      this.listenContentChangeAndUpdateElHeight();
    });
  }

  private sendToExternal(data: CodeModel) {
    this.config?.event(data);
  }

  // Struct element node: start ---> //
  private drawView() {
    this._wrapper = document.createElement('div');
    this._option = document.createElement('div');
    this._editor = document.createElement('div');

    this._wrapper.appendChild(this._option);
    this._wrapper.appendChild(this._editor);

    this._option.classList.add('option-wrapper');
    // this._editor.classList.add(this.api.styles.block);
    this._wrapper.classList.add('code-wrapper');

    this._editor.style.height = `${this.calEleHeight()}rem`;
    this._editor.style.maxHeight = '70vh';
    this._editor.style.minHeight = '10rem';

    this.loadEditor();
    this.structOption();

    return this._wrapper;
  }

  private calEleHeight() {
    const lines = this.data?.code?.split(/\n/)?.length ?? 10;
    const lineHigh = 1.2;
    return lineHigh * lines;
  }

  private listenContentChangeAndUpdateElHeight() {
    this.monacoEditor.getModel()?.onDidChangeContent((e) => {
      this._editor.style.height = `${
        this.monacoEditor.getModel()!.getLineCount() * 1.22
      }rem`;
    });
  }

  private structOption() {
    this.structFilenameInput();
    this.structLanguageSelector(availableLanguages);
    this.structRunButton();
    this.structConfigWrapper();

    this._option.appendChild(this._configWrapper);
    this._option.appendChild(this._runButton);
  }

  private structConfigWrapper() {
    this._configWrapper = document.createElement('div');
    this._configWrapper.classList.add('config-wrapper');

    if (!this.readOnly) {
      this._configWrapper.appendChild(this._filenameInput);
      this._configWrapper.appendChild(this._languageSelector);
    } else {
      let p = document.createElement('p');
      p.innerText = `${this.data.name} with ${this.data.language}`;
      this._configWrapper.appendChild(p);
    }
  }

  private structFilenameInput() {
    const filenamePattern = /^[a-zA-Z0-9_-]+$/;
    this._filenameInput = document.createElement('input');
    this._filenameInput.type = 'text';
    this._filenameInput.required = true;
    this._filenameInput.placeholder = 'Enter file name';
    this._filenameInput.value = this.data.name || '';

    this._filenameInput.addEventListener('keyup', () => {
      let currentValue = this._filenameInput.value;
      if (!currentValue.match(filenamePattern)) {
        this._filenameInput.value = this.previousValue;
      }

      this.data.name = this._filenameInput.value;
      this.previousValue = this.data.name;
    });
  }

  private structLanguageSelector(lang: Language[]) {
    this._languageSelector = document.createElement('select');

    lang.forEach((l) => {
      let option = document.createElement('option');
      option.text = l.name;
      option.value = l.id;
      this._languageSelector.appendChild(option);
    });

    this._languageSelector.value = this.data.language || 'c';

    this._languageSelector.onchange = () => {
      this.data.language = this._languageSelector.value;

      this.ieditor.setModelLanguage(
        this.monacoEditor.getModel()!,
        this._languageSelector.value
      );
    };
  }

  private structRunButton() {
    this._runButton = document.createElement('button');
    this._runButton.classList.add('run-button');
    this._runButton.textContent = 'ไปหน้ารันโค้ด';

    this._runButton.addEventListener('click', () => {
      this.runCode();
    });
  }
  // Struct element node: end <-- //

  private runCode() {
    let code = this.monacoEditor.getValue();
    this.sendToExternal({
      name: this.data.name,
      language: this.data.language,
      code,
      theme: this.data.theme,
    });
  }

  static get enableLineBreaks() {
    return true;
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: '<p style="font-family:monospace;font-weight-bold;font-size: 16px;">C</p>',
      title: 'Code Block',
    };
  }
}
