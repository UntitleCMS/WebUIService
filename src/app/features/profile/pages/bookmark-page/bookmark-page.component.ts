import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';

@Component({
  selector: 'app-bookmark-page',
  standalone: true,
  imports: [CommonModule, LazyPostGeneratorComponent],
  templateUrl: './bookmark-page.component.html',
  styleUrl: './bookmark-page.component.scss',
})
export class BookmarkPageComponent  {
}
