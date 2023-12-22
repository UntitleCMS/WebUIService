import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache = new Map<string, HttpResponse<any>>();

  constructor() {}

  resetPostCacheOnUpdate(postId: string) {
    const apiPath = `/api/article/v1/articles/${postId}`;
    this.removeFromCache(apiPath);
  }

  removeFromCache(apiPath: string) {
    this.cache.delete(apiPath);
  }

  hadleCachingOnFollowUser(userId: string) {
    const apiPath = `/apis/profiles/${userId}`;
    if (this.checkCacheByKey(apiPath)) {
      const cache = this.getCacheByKey(apiPath)!;
      let newCache = cache.clone<Profile>({
        body: {
          ...cache.body,
          follower: cache.body.follower + 1,
        },
      });
      this.cache.set(apiPath, newCache);
    }
  }

  private checkCacheByKey(key: string) {
    return this.cache.has(key);
  }

  private getCacheByKey(key: string) {
    return this.cache.get(key);
  }
}
