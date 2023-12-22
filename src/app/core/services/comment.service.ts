import { Injectable } from '@angular/core';
import { CommentRepositoryService } from '../repositories/comment-repository.service';
import { map, switchMap } from 'rxjs';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
  CommentRequest,
} from '../models/comment';
import { UserInformationService } from './user-information.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private commentRepo: CommentRepositoryService,
    private userInformationService: UserInformationService
  ) {}

  getAllCommentsInPost(postId: string) {
    return this.commentRepo.getCommentsByPostId(postId).pipe(
      switchMap((response) => {
        const comments = response;
        const ownerIds = comments.map((comment) => comment.commentOwnerId);

        return this.mapCommentsAndOwners(comments, ownerIds);
      })
    );
  }

  mapCommentsAndOwners(comments: Comment[], ownerIds: string[]) {
    return this.userInformationService.getDisplayName(ownerIds).pipe(
      map((owners) =>
        comments.map(
          (comment) =>
            ({
              comment: comment,
              owner: owners.find(
                (owner) => owner.userId === comment.commentOwnerId
              ),
            } as CommentAndOwner)
        )
      )
    );
  }

  getCommentByIdInPost(postId: string, commentId: string) {
    return this.commentRepo.getCommentByPostId(postId, commentId).pipe(
      switchMap((response) => {
        const comment = response;
        const ownerId = comment.commentOwnerId;
        return this.mapCommentAndOwner(comment, ownerId);
      })
    );
  }

  mapCommentAndOwner(comment: Comment, ownerId: string) {
    return this.userInformationService
      .getDisplayName([ownerId])
      .pipe(
        map(
          (owner) => ({ comment: comment, owner: owner[0] } as CommentAndOwner)
        )
      );
  }

  getCommentAndReplyInPost(postId: string) {
    return this.getAllCommentsInPost(postId).pipe(
      map((caos) => {
        let mainComments = caos.filter((cao) => !cao.comment.replyToId);
        let replyComments = caos.filter((cao) => cao.comment.replyToId);
        return mainComments.map(
          (comment) =>
            ({
              comment: comment,
              replies: replyComments.filter(
                (reply) => reply.comment.replyToId === comment.comment._id
              ),
            } as CommentAndReplies)
        );
      })
    );
  }

  addCommentToPost(postId: string, comment: CommentRequest) {
    return this.commentRepo.addCommentToPostId(postId, comment);
  }

  editCommentInPost(postId: string, comment: CommentRequest) {
    return this.commentRepo.editCommentInPostId(postId, comment);
  }

  deleteCommentInPost(postId: string, commentId: string) {
    return this.commentRepo.deleteCommentInPostId(postId, commentId);
  }
}
