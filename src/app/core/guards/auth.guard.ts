import { CanActivateFn } from '@angular/router';
import { AuthorityService } from '../auth/authority.service';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  const authorityService = inject(AuthorityService);
  const oauth = inject(OAuthService);
  if (!authorityService.isLoggedin) {
    oauth.loadDiscoveryDocumentAndLogin();
    return false;
  }
  return true;
};
