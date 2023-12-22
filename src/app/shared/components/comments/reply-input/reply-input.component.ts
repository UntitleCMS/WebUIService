import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { CommentAndOwner } from '../../../../core/models/comment';
import { CommentService } from '../../../../core/services/comment.service';

@Component({
  selector: 'app-reply-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reply-input.component.html',
  styleUrl: './reply-input.component.scss',
})
export class ReplyInputComponent {
  @Input({ required: true }) forPostId = '';
  @Input({ required: true }) forCommentId = '';

  @Output() addReply = new EventEmitter<CommentAndOwner>();

  data = '';

  constructor(private commentService: CommentService) {}

  sendReply() {
    this.commentService
      .addCommentToPost(this.forPostId, {
        data: this.data,
        replyToId: this.forCommentId,
      })
      .pipe(
        switchMap((res) =>
          this.commentService.mapCommentAndOwner(res, res.commentOwnerId)
        )
      )
      .subscribe((reply) => {
        this.addReply.emit(reply);
        this.data = '';
      });
  }
}
