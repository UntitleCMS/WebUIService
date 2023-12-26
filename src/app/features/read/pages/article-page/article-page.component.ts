import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/posts/post/post.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { CommonModule } from '@angular/common';
import { TagService } from '../../../../core/services/tag.service';
import { Tag } from '../../../../core/models/tag';
import { TagComponent } from '../../../../shared/components/tags/tag/tag.component';
import { ThaiDatePipe } from '../../../../shared/pipes/thai-date.pipe';
import { ClickInsideDirective } from '../../../../shared/directives/click-inside.directive';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { CommentSectionComponent } from '../../../../shared/components/comments/comment-section/comment-section.component';
import { LoveButtonComponent } from '../../../../shared/components/ui/love-button/love-button.component';
import { BookmarkButtonComponent } from '../../../../shared/components/ui/bookmark-button/bookmark-button.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    RelativeTimePipe,
    ThaiDatePipe,
    TagComponent,
    ClickInsideDirective,
    ClickOutsideDirective,
    CommentSectionComponent,
    LoveButtonComponent,
    BookmarkButtonComponent,
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  post!: PostAndAuthor;

  synthTags: Tag[] = [];

  isShowingFullCreateTime = false;
  isShowingFullUpdateTime = false;

  isLoadComment = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          const postId = params.get('postId');
          if (!postId) {
            throw new Error('Invalid Post ID');
          }
          return postId;
        }),
        switchMap((postId) => this.postService.getSinglePostById(postId))
      )
      .subscribe((post) => {
        this.synthTags = this.tagService.mapAllTags(post.post.tags);
        this.post = post;
      });
  }

  showFullCreateTime() {
    this.isShowingFullCreateTime = true;
  }

  hideFullCreateTime() {
    this.isShowingFullCreateTime = false;
  }

  showFullUpdateTime() {
    this.isShowingFullUpdateTime = true;
  }

  hideFullUpdateTime() {
    this.isShowingFullUpdateTime = false;
  }

  loadCommentSection() {
    this.isLoadComment = true;
  }

  onLove() {
    this.post.post.likeCount++;
  }

  onUnlove() {
    this.post.post.likeCount--;
  }
}
