import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentOptionsComponent } from '../comment-options/comment-options.component';
import { UserHeaderComponent } from '../../users/user-header/user-header.component';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { Comment, CommentAndOwner } from '../../../../core/models/comment';
import { CommentService } from '../../../../core/services/comment.service';
import { AuthorityService } from '../../../../core/auth/authority.service';

@Component({
  selector: 'app-reply',
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
export class ReplyComponent implements OnInit {
  @Input() reply!: CommentAndOwner;

  @Output() onDeleteReplySuccess = new EventEmitter<Comment>();

  myId = '';

  constructor(
    private commentService: CommentService,
    private authority: AuthorityService
  ) {}

  ngOnInit(): void {
    this.myId = this.authority.user_id!;
  }

  deleteReply() {
    this.commentService
      .deleteCommentInPost(this.reply.comment.postId, this.reply.comment._id)
      .subscribe((reply) => this.onDeleteReplySuccess.emit(reply));
  }
}
