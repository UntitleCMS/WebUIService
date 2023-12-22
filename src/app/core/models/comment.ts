import { DisplayName } from './user';

export interface CommentRequest {
  data: string;
  replyToId?: string;
}

export interface Comment {
  _id: string;
  postId: string;
  commentOwnerId: string;
  data: string;
  timestamp: Date;
  replyToId?: string;
}

export interface CommentAndOwner {
  comment: Comment;
  owner: DisplayName;
}

export interface CommentAndReplies {
  comment: CommentAndOwner;
  replies: CommentAndOwner[];
}
