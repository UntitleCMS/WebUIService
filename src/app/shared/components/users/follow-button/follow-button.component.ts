import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { OverlayComponent } from '../../utils/overlay/overlay.component';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.scss',
})
export class FollowButtonComponent {
  @Input({ required: true }) followStatus = false;

  @Output() followEmitter = new EventEmitter();
  @Output() unfollowEmitter = new EventEmitter();

  isConfirmUnfollowPanelOpen = false;

  private clickSubject = new Subject<void>();

  constructor() {
    this.clickSubject
      .pipe(
        debounceTime(500),
        tap(() => this.toggleFollowInternal())
      )
      .subscribe();
  }

  debouncedToggleFollow() {
    if (this.isConfirmUnfollowPanelOpen) {
      this.closeConfirmUnfollowPanel();
    }
    this.clickSubject.next();
  }

  private toggleFollowInternal() {
    return this.followStatus ? this.unfollow() : this.follow();
  }

  follow() {
    if (this.followStatus) return;
    this.followEmitter.emit();
  }

  unfollow() {
    if (!this.followStatus) return;
    this.unfollowEmitter.emit();
  }

  openConfirmUnfollowPanel() {
    this.isConfirmUnfollowPanelOpen = true;
  }

  closeConfirmUnfollowPanel() {
    this.isConfirmUnfollowPanelOpen = false;
  }
}
