import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentOptionsComponent } from '../comment-options/comment-options.component';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { Comment, CommentAndOwner } from '../../../../core/models/comment';
import { CommentService } from '../../../../core/services/comment.service';
import { UserHeaderComponent } from '../../user/user-header/user-header.component';
import { UserService } from '../../../../core/auth/user.service';

@Component({
  selector: 'Reply',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    RelativeTimePipe,
    CommentOptionsComponent,
  ],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
})
export class ReplyComponent {
  @Input() reply!: CommentAndOwner;
  @Output() onDeleteReplySuccess = new EventEmitter<Comment>();

  user = inject(UserService);

  constructor(private commentService: CommentService) {}

  deleteReply() {
    this.commentService
      .deleteCommentInPost(this.reply.comment.postId, this.reply.comment._id)
      .subscribe((reply) => this.onDeleteReplySuccess.emit(reply));
  }
}
