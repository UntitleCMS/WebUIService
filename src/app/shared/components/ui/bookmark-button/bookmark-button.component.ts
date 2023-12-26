import { Component, Input } from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-button.component.html',
  styleUrl: './bookmark-button.component.scss',
})
export class BookmarkButtonComponent {
  @Input({ required: true }) isBookmarked = false;
  @Input({ required: true }) ofPostId = '';

  private clickSubject = new Subject<void>();

  constructor(private postService: PostService) {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleBookmarkInternal())
      )
      .subscribe();
  }

  debouncedToggleBookmark() {
    this.clickSubject.next();
  }

  bookmark() {
    return this.postService
      .savePost(this.ofPostId)
      .pipe(tap(() => (this.isBookmarked = true)));
  }

  unbookmark() {
    return this.postService
      .unsavePost(this.ofPostId)
      .pipe(tap(() => (this.isBookmarked = false)));
  }

  private toggleBookmarkInternal() {
    return this.isBookmarked ? this.unbookmark() : this.bookmark();
  }
}
