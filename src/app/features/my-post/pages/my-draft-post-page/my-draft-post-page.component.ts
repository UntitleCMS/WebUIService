import { Component, OnInit, inject } from '@angular/core';
import { PostOverviewComponent } from '../../../../shared/components/post/post-overview/post-overview.component';
import { PostService } from '../../../../core/services/post.service';
import { PostOverviewAndAuthor } from '../../../../core/models/post';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-draft-post-page',
  standalone: true,
  imports: [CommonModule, PostOverviewComponent],
  templateUrl: './my-draft-post-page.component.html',
  styleUrl: './my-draft-post-page.component.scss',
})
export class MyDraftPostPageComponent implements OnInit {
  private postService = inject(PostService);

  posts: PostOverviewAndAuthor[] | undefined;

  ngOnInit(): void {
    this.postService.getDraftPosts({ pivot: null, size: 100 }).subscribe({
      next: (posts) => (this.posts = posts),
    });
  }

  deleteFromList(post: PostOverviewAndAuthor) {
    this.posts = this.posts?.filter((p) => post.post.id !== p.post.id);
  }
}
