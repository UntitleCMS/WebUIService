import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-button.component.html',
  styleUrl: './love-button.component.scss',
})
export class LoveButtonComponent {
  @Input({ required: true }) isLoved = false;
  @Input({ required: true }) ofPostId = '';

  @Output() loved = new EventEmitter();
  @Output() unloved = new EventEmitter();

  private clickSubject = new Subject<void>();

  constructor(private postService: PostService) {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleLoveInternal())
      )
      .subscribe();
  }

  debouncedToggleLove() {
    this.clickSubject.next();
  }

  love() {
    this.incrementCount();
    return this.postService.likePost(this.ofPostId).pipe(
      tap({
        error: () => this.decrementCount(),
      })
    );
  }

  unlove() {
    this.decrementCount();
    return this.postService.unlikePost(this.ofPostId).pipe(
      tap({
        error: () => this.incrementCount(),
      })
    );
  }

  private incrementCount = () => {
    this.isLoved = true;
    this.loved.emit();
  };

  private decrementCount = () => {
    this.isLoved = false;
    this.unloved.emit();
  };

  private toggleLoveInternal() {
    return this.isLoved ? this.unlove() : this.love();
  }
}
