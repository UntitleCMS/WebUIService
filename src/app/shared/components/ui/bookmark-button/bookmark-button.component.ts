import { Component, Input } from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../core/services/toast.service';

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

  constructor(
    private postService: PostService,
    private toastService: ToastService
  ) {
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
    return this.postService.savePost(this.ofPostId).pipe(
      tap(() => {
        this.isBookmarked = true;
        this.toastService.push({
          title: 'เพิ่มโพสต์ไปยังบุ๊กมาร์กแล้ว',
          type: 'success',
          icon: 'done',
        });
      })
    );
  }

  unbookmark() {
    return this.postService.unsavePost(this.ofPostId).pipe(
      tap(() => {
        this.isBookmarked = false;
        this.toastService.push({
          title: 'นำโพสต์ออกจากบุ๊กมาร์กแล้ว',
          type: 'success',
          icon: 'done',
        });
      })
    );
  }

  private toggleBookmarkInternal() {
    return this.isBookmarked ? this.unbookmark() : this.bookmark();
  }
}
