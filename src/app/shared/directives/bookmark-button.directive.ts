import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { PostService } from '../../core/services/post.service';
import { LazyPostService } from '../../core/services/lazy-post.service';

@Directive({
  selector: '[bookmarkButton]',
  standalone: true,
})
export class BookmarkButtonDirective {
  @Input({ required: true }) forPostId!: string;
  @Input({ required: true }) isBookmark!: boolean;
  @Output() bookmarked = new EventEmitter<boolean>();

  elementRef = inject(ElementRef);
  postService = inject(PostService);
  lazyPost = inject(LazyPostService);

  private clickSubject = new Subject<void>();

  constructor() {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleBookmarkInternal())
      )
      .subscribe();
  }

  @HostListener('click') onClick() {
    this.debouncedToggleBookmark();
  }

  debouncedToggleBookmark() {
    this.clickSubject.next();
  }

  bookmark() {
    return this.postService.savePost(this.forPostId).pipe(
      tap({
        next: () => {
          this.bookmarked.emit(true);
          this.lazyPost.disposeMap();
        },
      })
    );
  }

  unbookmark() {
    return this.postService.unsavePost(this.forPostId).pipe(
      tap({
        next: () => {
          this.bookmarked.emit(false);
          this.lazyPost.disposeMap();
        },
      })
    );
  }

  private toggleBookmarkInternal() {
    return this.isBookmark ? this.unbookmark() : this.bookmark();
  }
}
