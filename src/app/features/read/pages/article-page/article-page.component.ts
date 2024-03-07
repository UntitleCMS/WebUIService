import { Component, OnInit, inject } from '@angular/core';
import { PostComponent } from '../../../../shared/components/post/post/post.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { CommentSectionComponent } from '../../../../shared/components/comment/comment-section/comment-section.component';
import { map, shareReplay, switchMap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoveButtonDirective } from '../../../../shared/directives/love-button.directive';
import { BookmarkButtonDirective } from '../../../../shared/directives/bookmark-button.directive';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    CommentSectionComponent,
    LoveButtonDirective,
    BookmarkButtonDirective,
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  post!: PostAndAuthor;

  private postService = inject(PostService);
  private route = inject(ActivatedRoute);

  isLoadComment = false;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramMap) => {
          const postId = paramMap.get('postId');

          if (!postId) {
            throw new Error('Invalid post ID');
          }

          return postId;
        }),
        shareReplay(),
        switchMap((postId) => this.postService.getSinglePostById(postId))
      )
      .subscribe((post) => (this.post = post));
  }

  loadCommentSection() {
    this.isLoadComment = true;
  }

  like(b: boolean) {
    this.post.post.isLiked = b;
    b ? this.post.post.likeCount++ : this.post.post.likeCount--;
  }

  bookmark(b: boolean) {
    this.post.post.isSaved = b;
  }
}
