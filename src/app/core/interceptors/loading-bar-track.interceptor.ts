import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { finalize, tap } from 'rxjs';

export const loadingBarTrackInterceptor: HttpInterceptorFn = (req, next) => {
  let loader = inject(LoadingBarService);

  let started = false;
  const ref = loader.useRef('http');
  return next(req).pipe(
    tap(() => {
      if (!started) {
        ref.start();
        started = true;
      }
    }),
    finalize(() => started && ref.complete())
  );
};
