import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../auth/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(UserService);
  const router = inject(Router);

  if (!user.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
