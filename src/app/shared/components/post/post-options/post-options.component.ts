import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ClickInsideDirective } from '../../../directives/click-inside.directive';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { RouterLink } from '@angular/router';
import { OverlayComponent } from '../../utils/overlay/overlay.component';
import { PostService } from '../../../../core/services/post.service';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'PostOptions',
  standalone: true,
  imports: [
    CommonModule,
    ClickInsideDirective,
    ClickOutsideDirective,
    RouterLink,
    OverlayComponent,
  ],
  templateUrl: './post-options.component.html',
  styleUrl: './post-options.component.scss',
})
export class PostOptionsComponent {
  @Input({ required: true }) forId!: string;
  @Output() delete = new EventEmitter();
  isOpen = false;

  postService = inject(PostService);
  lazyPost = inject(LazyPostService);
  toastService = inject(ToastService);

  isConfirmDeletePostPanelOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  openConfirmDeletePostPanel() {
    this.isConfirmDeletePostPanelOpen = true;
  }

  closeConfirmDeletePostPanel() {
    this.isConfirmDeletePostPanelOpen = false;
  }

  deletePost() {
    this.postService.deletePost(this.forId).subscribe(() => {
      this.toastService.push({
        title: 'ลบโพสต์สำเร็จ',
        type: 'success',
        icon: 'done',
        life: 3000
      });
      this.delete.emit();
      this.lazyPost.disposeMap();
      this.closeConfirmDeletePostPanel();
    });
  }
}
