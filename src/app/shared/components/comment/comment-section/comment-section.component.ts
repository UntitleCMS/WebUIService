import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
} from '../../../../core/models/comment';
import { UserService } from '../../../../core/auth/user.service';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { CommentService } from '../../../../core/services/comment.service';

@Component({
  selector: 'CommentSection',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentInputComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
})
export class CommentSectionComponent implements OnInit {
  @Input({ required: true }) postId = '';
  comments: CommentAndReplies[] = [];

  user = inject(UserService);
  auth = inject(AuthenticationService);
  commentService = inject(CommentService);

  ngOnInit(): void {
    this.commentService
      .getCommentAndReplyInPost(this.postId)
      .subscribe((comments) => (this.comments = comments));
  }

  addCommentToPost(comment: CommentAndOwner) {
    this.comments.push({ comment, replies: [] });
  }

  removeCommentFromPost(deletedComment: Comment) {
    this.comments = this.comments.filter(
      (comment) => comment.comment.comment._id !== deletedComment._id
    );
  }

  login() {
    this.auth.login();
  }
}
