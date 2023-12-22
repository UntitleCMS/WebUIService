import { Identifiable } from './identifiable';
import { Pageable } from './pageable';
import { Traceable } from './traceable';
import { Response } from './response';
import { DisplayName } from './user';

//---------- Post Response ----------//

export interface PostPreview extends Traceable, Identifiable {
  title: string;
  description: string;
  coverImage?: string;
  tags: string[];
  likeCount: number;
  isPublished: boolean;
  isSaved?: boolean;
  isLiked?: boolean;
}

export interface Post extends PostPreview {
  content: string;
}

export type PostsResponse = Response<Pageable<PostPreview[]>>;
export type SinglePostResponse = Response<Post>;

//---------- Post Request ----------//

export interface PostRequest {
  title: string;
  description: string;
  coverImage?: string;
  content: string;
  tags: string[];
  isPublish: boolean;
}

export interface PostAddRequest extends PostRequest {}
export interface PostUpdateRequest extends PostRequest {}

export class PostUpdateRequest {}

//---------- Post Usage ----------//

export interface PostPreviewAndAuthor {
  postPreview: PostPreview;
  author: DisplayName;
}

export interface PostAndAuthor {
  post: Post;
  author: DisplayName;
}
