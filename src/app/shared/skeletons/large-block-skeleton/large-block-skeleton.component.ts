import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-large-block-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './large-block-skeleton.component.html',
  styleUrl: './large-block-skeleton.component.scss'
})
export class LargeBlockSkeletonComponent {
  @Input() isAnimate = false;
}
