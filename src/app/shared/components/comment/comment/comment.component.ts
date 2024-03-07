import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserHeaderComponent } from '../../user/user-header/user-header.component';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
} from '../../../../core/models/comment';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { CommentOptionsComponent } from '../comment-options/comment-options.component';
import { CommentService } from '../../../../core/services/comment.service';
import { UserService } from '../../../../core/auth/user.service';
import { ReplyComponent } from '../reply/reply.component';
import { ReplyInputComponent } from '../reply-input/reply-input.component';

@Component({
  selector: 'Comment',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    RelativeTimePipe,
    CommentOptionsComponent,
    ReplyComponent,
    ReplyInputComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input({ required: true }) commentAndReplies!: CommentAndReplies;
  @Input() isLoggedIn = false;
  @Output() onDeleteCommentSuccess = new EventEmitter<Comment>();

  user = inject(UserService);
  commentService = inject(CommentService);

  isReplyOpen = false;
  openReply() {
    this.isReplyOpen = true;
  }

  closeReply() {
    this.isReplyOpen = false;
  }

  deleteComment() {
    this.commentService
      .deleteCommentInPost(
        this.commentAndReplies.comment.comment.postId,
        this.commentAndReplies.comment.comment._id
      )
      .subscribe((comment) => this.onDeleteCommentSuccess.emit(comment));
  }

  addReplyToComment(reply: CommentAndOwner) {
    this.commentAndReplies.replies.push(reply);
  }

  deleteReplyFromComment(deletedReply: Comment) {
    this.commentAndReplies.replies = this.commentAndReplies.replies.filter(
      (reply) => reply.comment._id !== deletedReply._id
    );
  }
}
