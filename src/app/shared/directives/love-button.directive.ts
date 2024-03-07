import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { LazyPostService } from '../../core/services/lazy-post.service';

@Directive({
  selector: '[loveButton]',
  standalone: true,
})
export class LoveButtonDirective {
  @Input({ required: true }) forPostId!: string;
  @Input({ required: true }) isLiked!: boolean;
  @Output() liked = new EventEmitter<boolean>();

  elementRef = inject(ElementRef);
  postService = inject(PostService);
  lazyPost = inject(LazyPostService);

  private clickSubject = new Subject<void>();

  constructor() {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleLikeInternal())
      )
      .subscribe();
  }

  @HostListener('click') onClick() {
    this.debouncedToggleLike();
  }

  debouncedToggleLike() {
    this.clickSubject.next();
  }

  like() {
    return this.postService.likePost(this.forPostId).pipe(
      tap({
        next: () => {
          this.liked.emit(true);
          this.lazyPost.disposeMap();
        },
      })
    );
  }

  unlike() {
    return this.postService.unlikePost(this.forPostId).pipe(
      tap({
        next: () => {
          this.liked.emit(false);
          this.lazyPost.disposeMap();
        },
      })
    );
  }

  private toggleLikeInternal() {
    return this.isLiked ? this.unlike() : this.like();
  }
}
