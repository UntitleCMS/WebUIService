import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private oauth = inject(OAuthService);

  getAccessToken() {
    const token = this.oauth.getAccessToken();

    if (token && !this.isTokenValid()) {
      this.oauth.logOut();
      return null;
    }
    return token;
  }

  isTokenValid() {
    return this.oauth.hasValidAccessToken();
  }

  extractUserIdFromToken() {
    let token = this.getAccessToken();
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1]))['sub-b64'] as string;
  }
}
