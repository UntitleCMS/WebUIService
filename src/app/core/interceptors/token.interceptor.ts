import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../auth/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  if (!tokenService.getAccessToken()) return next(req);

  let authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenService.getAccessToken()!}`,
    },
  });
  return next(authReq);
};
