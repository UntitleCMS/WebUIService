import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { RouterLink } from '@angular/router';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
} from '../../../../core/models/comment';
import { CommentService } from '../../../../core/services/comment.service';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentInputComponent, RouterLink],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
})
export class CommentSectionComponent implements OnInit {
  @Input({ required: true }) postId!: string;
  isLoggedIn = true;

  comments: CommentAndReplies[] = [];

  constructor(
    private commentService: CommentService,
    private authorityService: AuthorityService,
    private oauth: OAuthService
  ) {}

  ngOnInit(): void {
    if (this.postId.length) {
      this.commentService
        .getCommentAndReplyInPost(this.postId)
        .subscribe((comments) => (this.comments = comments));
    }

    this.authorityService.isLoggedin$.subscribe(
      (status) => (this.isLoggedIn = status)
    );
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
    this.oauth.loadDiscoveryDocumentAndLogin();
  }
}
