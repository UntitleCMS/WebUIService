import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../utils/overlay/overlay.component';

@Component({
  selector: 'CommentOptions',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './comment-options.component.html',
  styleUrl: './comment-options.component.scss',
})
export class CommentOptionsComponent {
  @Output() onDeleteComment = new EventEmitter();
  isPanelOpen = false;
  isDeletePanelOpen = false;

  openPanel() {
    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }

  openDeletePanel() {
    this.isDeletePanelOpen = true;
  }

  closeDeletePanel() {
    this.isDeletePanelOpen = false;
  }

  editComment() {}

  deleteComment() {
    this.onDeleteComment.emit();
  }
}
