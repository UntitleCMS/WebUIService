import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostPreviewComponent } from '../../../../shared/components/posts/post-preview/post-preview.component';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { RouterLink } from '@angular/router';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { PostService } from '../../../../core/services/post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';

@Component({
  selector: 'app-my-post-page',
  standalone: true,
  imports: [
    CommonModule,
    PostPreviewComponent,
    OverlayComponent,
    RouterLink,
    LazyPostGeneratorComponent,
    PostPreviewComponent
  ],
  templateUrl: './my-post-page.component.html',
  styleUrl: './my-post-page.component.scss',
})
export class MyPostPageComponent implements OnInit {
  posts: PostPreviewAndAuthor[] = [];

  currentUserId: string | null = null;

  postFilter: 'published' | 'drafted' = 'published';

  constructor(
    private auth: AuthorityService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService
      .getDraftPosts({
        size: 20,
        pivot: null,
      })
      .subscribe((ppas) => (this.posts = ppas));

    this.auth.user_id$.subscribe((userId) => (this.currentUserId = userId));
  }

  switchFilterTo(filter: 'published' | 'drafted') {
    if (filter === 'published') {
      this.postFilter = 'published';
    } else {
      this.postFilter = 'drafted';
    }
  }
}
