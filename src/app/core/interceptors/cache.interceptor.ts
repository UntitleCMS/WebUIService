import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { of, tap } from 'rxjs';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== 'GET') {
    return next(req);
  }

  if (cacheService.cache.has(req.urlWithParams)) {
    const cachedResponse = cacheService.cache.get(req.urlWithParams)!;
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.cache.set(req.urlWithParams, event);
      }
    })
  );
};
