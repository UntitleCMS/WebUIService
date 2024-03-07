import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private oauth = inject(OAuthService);
  private userService = inject(UserService);

  login() {
    this.oauth.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    this.oauth.logOut();
    this.userService.setUserFromToken();
  }
}
