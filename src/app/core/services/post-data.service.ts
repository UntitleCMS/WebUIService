import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  title = signal('');
  description = signal('');
  tags = signal<string[]>([]);
  coverFile = signal<File | undefined>(undefined);
  coverSrc = signal<string | undefined>(undefined);
  content = signal<string>('');

  constructor() {}

  logging() {
    console.log(this.title());
    console.log(this.description());
    console.log(this.tags());
    console.log(this.coverFile());
    console.log(this.coverSrc());
    console.log(this.content());
    
  }
}
