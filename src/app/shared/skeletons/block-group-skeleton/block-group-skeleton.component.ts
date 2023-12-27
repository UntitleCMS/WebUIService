import { Component, Input } from '@angular/core';
import { BlockComponent } from '../block/block.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-group-skeleton',
  standalone: true,
  imports: [CommonModule, BlockComponent],
  templateUrl: './block-group-skeleton.component.html',
  styleUrl: './block-group-skeleton.component.scss',
})
export class BlockGroupSkeletonComponent {
  @Input() isAnimate = false;
}
