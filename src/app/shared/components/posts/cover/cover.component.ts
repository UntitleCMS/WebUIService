import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss',
})
export class CoverComponent {
  @Input() type: 'preview' | 'full' = 'preview';
  @Input() src: string = 'assets/images/default-image.svg';

  onCoverImageError(e: Event) {
    let el = e.target as HTMLImageElement;
    el.src = 'assets/images/default-image.svg';
    el.onerror = null;
  }
}
