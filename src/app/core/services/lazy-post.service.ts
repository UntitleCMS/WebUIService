import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { PostService } from './post.service';
import { PostOverviewAndAuthor } from '../models/post';
import { GetPostsOptions } from '../repositories/post-repository.service';
import { tap } from 'rxjs';

type LoadMoreOptions = {
  completeCallback: () => void;
  zeroLengthHandler: () => void;
};

class PostMap {
  currentPivot: string | null;
  isEndLoad: boolean;
  posts: WritableSignal<PostOverviewAndAuthor[]>;

  constructor() {
    this.currentPivot = null;
    this.isEndLoad = false;
    this.posts = signal<PostOverviewAndAuthor[]>([]);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LazyPostService {
  private cacheMap = new Map<string, PostMap>();
  private postService = inject(PostService);

  currentPosts = signal<PostOverviewAndAuthor[]>([]);

  private getFromMap(key: string) {
    if (!this.cacheMap.has(key)) {
      this.cacheMap.set(key, new PostMap());
    }

    return this.cacheMap.get(key)!;
  }

  disposeMap() {
    this.cacheMap.clear();
  }

  loadPostToKey(
    key: string,
    { completeCallback, zeroLengthHandler }: LoadMoreOptions
  ) {
    let postMap = this.getFromMap(key);

    if (postMap.isEndLoad) {
      zeroLengthHandler();
      this.currentPosts.set(postMap.posts());
      return;
    }

    let options: GetPostsOptions = {
      size: 20,
      pivot: postMap.currentPivot,
      author: key.startsWith('author') ? key.slice(6) : undefined,
      tags: key.startsWith('tag') ? [key.slice(3)] : undefined,
      bookmark: key.startsWith('bookmark') ? true : undefined,
      following: key.startsWith('following') ? true : undefined,
    };

    this.postService
      .getAllPosts(options)
      .pipe(
        tap({
          next: (pRes) => {
            if (pRes.length > 0) {
              postMap.currentPivot = pRes[pRes.length - 1].post.id;
              postMap.posts.set([...postMap.posts(), ...pRes]);
              if (pRes.length < options.size) {
                zeroLengthHandler();
                postMap.isEndLoad = true;
              }
              this.currentPosts.set(postMap.posts());
            } else {
              zeroLengthHandler();
              this.currentPosts.set(postMap.posts());
              postMap.isEndLoad = true;
            }
          },
          complete: () => {
            completeCallback();
          },
        })
      )
      .subscribe();
  }
}
