import { Identifiable } from './identifiable';
import { Pageable } from './pageable';
import { Traceable } from './traceable';
import { Response } from './response';
import { DisplayName } from './user';

//---------- Post Response ----------//

export interface PostOverview extends Traceable, Identifiable {
  title: string;
  description: string;
  coverImage?: string;
  tags: string[];
  likeCount: number;
  isPublished: boolean;
  isSaved?: boolean;
  isLiked?: boolean;
}

export interface Post extends PostOverview {
  content: string;
}

export type PostsResponse = Response<Pageable<PostOverview[]>>;
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

export interface PostOverviewAndAuthor {
  post: PostOverview;
  author: DisplayName;
}

export interface PostAndAuthor {
  post: Post;
  author: DisplayName;
}
