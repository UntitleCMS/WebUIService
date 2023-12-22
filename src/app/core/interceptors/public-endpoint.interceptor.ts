import { HttpInterceptorFn } from '@angular/common/http';
import { AuthorityService } from '../auth/authority.service';
import { inject } from '@angular/core';

export const publicEndpointInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthorityService);

  if (req.url.includes('/articles') && !authService.isLoggedin) {
    console.debug('intercept : PublicEndpointSwitcherInterceptor');
    const publicReq = req.clone({
      url: req.url.replace('/articles', '/public/articles'),
    });
    return next(publicReq);
  }
  return next(req);
};
