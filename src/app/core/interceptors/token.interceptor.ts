import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../auth/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  if (!tokenService.token) return next(req);

  let authReq = req.clone({
    setHeaders: {
      Authorization: `${tokenService.token.token_type} ${tokenService.token.access_token}`,
    },
  });
  return next(authReq);
};
