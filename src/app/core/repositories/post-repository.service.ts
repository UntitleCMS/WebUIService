import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PostAddRequest,
  PostUpdateRequest,
  PostsResponse,
  SinglePostResponse,
} from '../models/post';
import { KeyPair, Response } from '../models/response';
import { TagCount } from '../models/tag';
import { map } from 'rxjs';

export type GetPostsOptions = {
  size: number;
  pivot: string | null;
  tags?: string[];
  author?: string;
  searchText?: string;
  bookmark?: boolean;
};

export type GetTagsOptions = {
  size: number;
  include?: string;
};

@Injectable({
  providedIn: 'root',
})
export class PostRepositoryService {
  private readonly postEndpoint = '/api/article/v1/articles';
  private readonly tagEndpoint = '/api/article/v1/tags';
  private readonly bookmarkEndpoint = '/api/article/v1/bookmark';

  constructor(private http: HttpClient) {}

  getPosts({
    size,
    pivot,
    author,
    tags,
    searchText,
    bookmark,
  }: GetPostsOptions) {
    let endpoint = bookmark ? this.bookmarkEndpoint : this.postEndpoint;
    endpoint += '?take=' + size;
    if (pivot) {
      endpoint += '&from=<' + pivot;
    }
    if (author) {
      endpoint += '&of=' + author;
    }
    if (tags && tags.length > 0) {
      endpoint += tags.map((tag) => '&tag=' + tag).join('');
    }

    if (searchText && searchText.length > 0) {
      endpoint += '&serch-text=' + searchText;
    }

    if (bookmark) {
      endpoint += '&bookmarked=true';
    }

    return this.http.get<PostsResponse>(endpoint.toString());
  }

  getPostById(id: string) {
    return this.http.get<SinglePostResponse>(`${this.postEndpoint}/${id}`);
  }

  addPost(post: PostAddRequest) {
    return this.http.post<Response<string>>(this.postEndpoint.toString(), post);
  }

  deletePost(id: string) {
    return this.http.delete<Response<string>>(`${this.postEndpoint}/${id}`);
  }

  updatePost(id: string, post: PostUpdateRequest) {
    return this.http.put<Response<string>>(`${this.postEndpoint}/${id}`, post);
  }

  likePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/like`, {});
  }

  unlikePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/unlike`, {});
  }

  savePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/save`, {});
  }

  unsavePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/unsave`, {});
  }

  getTopTags(n: number) {
    const params = new HttpParams({ fromObject: { n } });

    return this.http
      .get<Response<TagCount[]>>(`${this.tagEndpoint}`, {
        params,
      })
      .pipe(map((res) => res.data || []));
  }

  getAllTags({ size, include }: GetTagsOptions) {
    let endpoint = this.tagEndpoint;
    endpoint += '?n=' + size;
    if (include && include.length > 0) {
      endpoint += '&looklike=' + include;
    }
    return this.http
      .get<Response<TagCount[]>>(endpoint)
      .pipe(map((res) => res.data || []));
  }

  getTopLovePosts(n: number) {
    return this.http
      .get<Response<KeyPair[]>>(`${this.postEndpoint}/top/${n}`)
      .pipe(map((res) => res.data || []));
  }
}
