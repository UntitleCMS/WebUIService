import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostPreviewComponent } from '../../../../shared/components/posts/post-preview/post-preview.component';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { RouterLink } from '@angular/router';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { PostService } from '../../../../core/services/post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post';

@Component({
  selector: 'app-my-post-page',
  standalone: true,
  imports: [CommonModule, PostPreviewComponent, OverlayComponent, RouterLink],
  templateUrl: './my-post-page.component.html',
  styleUrl: './my-post-page.component.scss',
})
export class MyPostPageComponent implements OnInit {
  posts: PostPreviewAndAuthor[] = [];
  currentDeletePostId?: string;
  currentDeletePost?: PostPreviewAndAuthor;

  isConfirmDeletePanelOpen = false;

  constructor(
    private auth: AuthorityService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService
      .getAllPosts({
        size: 20,
        pivot: null,
        author: this.auth.user_id!,
      })
      .subscribe((ppas) => (this.posts = ppas));
  }

  openConfirmDeletePostPanel(postId: string) {
    this.isConfirmDeletePanelOpen = true;
    this.currentDeletePostId = postId;
    this.currentDeletePost = this.posts.find(
      (post) => post.postPreview.id === this.currentDeletePostId
    );
  }

  closeConfirmDeletePostPanel() {
    this.isConfirmDeletePanelOpen = false;
  }

  deletePost() {
    if (!this.currentDeletePostId) return;
    this.postService.deletePost(this.currentDeletePostId).subscribe(() => {
      this.posts = this.posts.filter(
        (post) => post.postPreview.id !== this.currentDeletePostId
      );
      this.closeConfirmDeletePostPanel();
      this.currentDeletePost = undefined;
      this.currentDeletePostId = undefined;
    });
  }
}
