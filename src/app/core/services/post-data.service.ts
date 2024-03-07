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
   
  }
}
