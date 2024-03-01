import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClickInsideDirective } from '../../../directives/click-inside.directive';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { RouterLink } from '@angular/router';
import { OverlayComponent } from '../../utils/overlay/overlay.component';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { ToastService } from '../../../../core/services/toast.service';
// import { PostManipulateService } from '../../../../core/services/post-manipulate.service';

@Component({
  selector: 'app-post-options',
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
  @Input({ required: true }) post!: PostPreviewAndAuthor;
  isOptionsMenuOpen = false;

  isConfirmDeletePostPanelOpen = false;
  // isCancelPublishPanelOpen = false;

  constructor(
    private postService: PostService,
    private toastService: ToastService
  ) // private postManipulate: PostManipulateService
  {}

  openOptionsMenu() {
    this.isOptionsMenuOpen = true;
  }

  closeOptionsMenu() {
    this.isOptionsMenuOpen = false;
  }

  openConfirmDeletePostPanel() {
    this.isConfirmDeletePostPanelOpen = true;
  }

  closeConfirmDeletePostPanel() {
    this.isConfirmDeletePostPanelOpen = false;
  }

  // openCancelPublishPanel() {
  //   this.isCancelPublishPanelOpen = true;
  // }

  // closeCancelPublishPanel() {
  //   this.isCancelPublishPanelOpen = false;
  // }

  deletePost() {
    this.postService.deletePost(this.post.postPreview.id).subscribe(() => {
      this.toastService.push({
        title: 'ลบโพสต์สำเร็จ',
        type: 'success',
        icon: 'done',
      });
      this.closeConfirmDeletePostPanel();
    });
  }

  // draft() {
  //   this.postManipulate.update(this.post.postPreview.id, 'draft').subscribe({
  //     next: () => {
  //       this.closeCancelPublishPanel();
  //     },
  //   });
  // }
}
