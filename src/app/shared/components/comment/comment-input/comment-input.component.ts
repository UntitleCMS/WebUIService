import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserHeaderComponent } from '../../user/user-header/user-header.component';
import { UserService } from '../../../../core/auth/user.service';
import { CommentAndOwner } from '../../../../core/models/comment';
import { CommentService } from '../../../../core/services/comment.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'CommentInput',
  standalone: true,
  imports: [CommonModule, FormsModule, UserHeaderComponent],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss',
})
export class CommentInputComponent {
  @Input({ required: true }) forPostId: string = '';
  @Output() addComment = new EventEmitter<CommentAndOwner>();

  user = inject(UserService);
  commentService = inject(CommentService);

  data = '';

  sendComment() {
    this.commentService
      .addCommentToPost(this.forPostId, {
        data: this.data,
      })
      .pipe(
        switchMap((res) =>
          this.commentService.mapCommentAndOwner(res, res.commentOwnerId)
        )
      )
      .subscribe((res) => {
        this.addComment.emit(res);
        this.data = '';
      });
  }
}
