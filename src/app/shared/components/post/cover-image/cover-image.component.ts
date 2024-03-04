import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'CoverImage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cover-image.component.html',
  styleUrl: './cover-image.component.scss'
})
export class CoverImageComponent {
  @Input() type: 'preview' | 'full' = 'preview';
  @Input() variant: 'desktop' | 'mobile' = 'desktop';
  @Input() src: string = 'assets/images/default-image.svg';

  onCoverImageError(e: Event) {
    let el = e.target as HTMLImageElement;
    el.src = 'assets/images/default-image.svg';
    el.onerror = null;
  }
}
