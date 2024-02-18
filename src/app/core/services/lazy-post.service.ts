import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PostPreviewAndAuthor } from '../models/post';
import { PostService } from './post.service';
import { GetPostsOptions } from '../repositories/post-repository.service';

type LoadMoreOptions = {
  author?: string;
  completeCallback: () => void;
  zeroLengthHandler: () => void;
};

class LazyPost {
  private _posts: BehaviorSubject<PostPreviewAndAuthor[]>;
  private _pivot: BehaviorSubject<string | null>;

  constructor() {
    this._posts = new BehaviorSubject<PostPreviewAndAuthor[]>([]);
    this._pivot = new BehaviorSubject<string | null>(null);
  }

  get posts() {
    return this._posts.value;
  }

  get posts$() {
    return this._posts.asObservable();
  }

  get pivot() {
    return this._pivot.value;
  }

  get pivot$() {
    return this._pivot.asObservable();
  }

  nextPosts(posts: PostPreviewAndAuthor[]) {
    this._posts.next(posts);
  }

  nextPivot(pivot: string | null) {
    this._pivot.next(pivot);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LazyPostService {
  private _lazyCacheMap = new Map<string, LazyPost>();

  constructor(private postService: PostService) {
    this._lazyCacheMap.set('all:', new LazyPost());
    this._lazyCacheMap.set('following:', new LazyPost());
  }

  getLazyMap(keyType: string, keyId: string) {
    if (this._lazyCacheMap.has(`${keyType}:${keyId}`)) {
      return this._lazyCacheMap.get(`${keyType}:${keyId}`)!;
    }

    this._lazyCacheMap.set(`${keyType}:${keyId}`, new LazyPost());
    return this._lazyCacheMap.get(`${keyType}:${keyId}`)!;
  }

  loadMoreTo(
    keyType: string,
    keyId: string,
    { zeroLengthHandler, completeCallback }: LoadMoreOptions
  ) {
    if (!this._lazyCacheMap.has(`${keyType}:${keyId}`)) return;
    const currentMap = this._lazyCacheMap.get(`${keyType}:${keyId}`)!;

    let options: GetPostsOptions = {
      size: 20,
      pivot: currentMap.pivot,
      author: keyType === 'author' ? keyId : undefined,
      tags: keyType === 'tag' ? [keyId] : undefined,
      bookmark: keyType === 'bookmark' ? true : undefined,
      following: keyType === 'following' ? true : undefined,
    };

    this.postService
      .getAllPosts(options)
      .pipe(
        tap((newPosts) => {
          if (newPosts.length > 0) {
            const lastPivot = newPosts[newPosts.length - 1].postPreview.id;
            currentMap.nextPosts([...currentMap.posts, ...newPosts]);
            currentMap.nextPivot(lastPivot);
          } else {
            zeroLengthHandler();
          }
        })
      )
      .subscribe({
        complete: () => completeCallback(),
      });
  }

  revokeCache(keyType: string, keyId: string = '') {
    this._lazyCacheMap.delete(`${keyType}:${keyId}`);
  }
}
