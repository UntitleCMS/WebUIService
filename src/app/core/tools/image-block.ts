import {
  API,
  BlockAPI,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
  SanitizerConfig,
} from '@editorjs/editorjs';
import { Token } from '../auth/token';
import { HttpClient } from '@angular/common/http';

interface ImageBlockData extends BlockToolData {
  name: string;
}

export interface ImageBlockConfig {
  token: Token | null;
  httpClient?: (cb: (http: HttpClient) => void) => void;
  onUploadFailure?: (e: any) => void;
  onUploadCompleate?: () => void;
}

export default class ImageBlock implements BlockTool {
  api: API;
  readOnly: boolean;
  config?: ImageBlockConfig;
  block: BlockAPI;
  data: ImageBlockData = {
    name: '',
    language: '',
    code: '',
  };

  _wrapper!: HTMLDivElement;
  _inputFile!: HTMLInputElement;
  _inputUi!: HTMLDivElement;
  _image!: HTMLImageElement;

  constructor({
    api,
    readOnly,
    config,
    data,
    block,
  }: BlockToolConstructorOptions<ImageBlockData, ImageBlockConfig>) {
    this.api = api;
    this.readOnly = readOnly;
    this.block = block!;
    this.config = config;
    if (data) this.data = data;

    this._wrapper = this.drawView();
  }

  save() {
    return this.data;
  }

  render() {
    return this._wrapper;
  }

  validate(blockData: ImageBlockData): boolean {
    if (blockData.name && blockData.name.length) {
      return true;
    }

    return false;
  }

  // Struct element node: start ---> //
  private drawView() {
    this._wrapper = document.createElement('div');
    this._inputUi = document.createElement('div');
    this._image = document.createElement('img');
    this._inputFile = document.createElement('input');

    this._wrapper.style.position = 'relative';

    this.structImage();
    this.structInputUi();
    this.structInputFile();

    if (this.readOnly) {
      if (this.data && this.data.name) this._wrapper.appendChild(this._image);
    } else {
      if (this.data && this.data.name) this._wrapper.appendChild(this._image);
      else this._wrapper.appendChild(this._inputUi);
    }
    return this._wrapper;
  }

  private structInputUi() {
    this._inputUi.classList.add(this.api.styles.block);

    if (!this.readOnly) {
      this._inputUi.addEventListener('click', () => this._inputFile.click());
    }
    this._inputUi.style.textAlign = 'center';
    this._inputUi.textContent = 'เลือกรูปภาพ';
    this._inputUi.style.border = '1px solid rgba(0,0,0,0.1)';
    this._inputUi.style.borderRadius = '4px';
    this._inputUi.style.cursor = 'pointer';
  }

  private structImage() {
    this._image.classList.add(this.api.styles.block);
    this._image.style.width = '100%';

    if (this.data && this.data.name) {
      this._image.src = '/api/img/v1/img/' + this.data.name;
    }
  }

  private structInputFile() {
    this._inputFile.style.display = 'hidden';
    this._inputFile.type = 'file';
    this._inputFile.accept = 'image/*';

    this._inputFile.addEventListener('change', async (e) => {
      let input = e.target as HTMLInputElement;
      if (!input.files?.item(0)) return;
      let file = input.files[0];
      let formData = new FormData();
      formData.append('img', file);

      if (this.config && this.config.token) {
        const appendImage = (json: any) => {
          this.data.name = json.img;
          this._image.src = '/api/img/v1/img/' + this.data.name;
          this._wrapper.innerHTML = '';
          this._wrapper.appendChild(this._image);
        };

        if (!this.config.httpClient) {
          let res = await fetch('/api/img/v1/img', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `${this.config.token.token_type} ${this.config.token.access_token}`,
            },
          });

          let json = await res.json();
          appendImage(json);
        } else {
          this.config.httpClient((http) => {
            console.log(http);

            http?.post('/api/img/v1/img', formData).subscribe({
              next: appendImage,
              error: this.config?.onUploadFailure,
              complete: this.config?.onUploadCompleate,
            });
          });
        }
      }
    });
  }
  // Struct element node: end <-- //

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: '<p style="font-family:monospace;font-weight-bold;font-size: 16px;">I</p>',
      title: 'Image',
    };
  }
}
