import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../auth/user.service';

export const publicEndpointInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(UserService);

  if (req.url.includes('/articles') && !user.isLoggedIn()) {
    
    console.debug('intercept : PublicEndpointSwitcherInterceptor');
    const publicReq = req.clone({
      url: req.url.replace('/articles', '/public/articles'),
    });
    return next(publicReq);
  }
  return next(req);
};
