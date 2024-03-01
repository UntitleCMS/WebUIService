import { Injectable } from '@angular/core';
import { AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.authIssuer,
  redirectUri: window.location.origin,
  clientId: 'console',
  responseType: 'code',
  scope: 'offline_access openid',
  showDebugInformation: true,
};

export function storageFactory(): OAuthStorage {
  try {
    return localStorage;
  } catch {
    return sessionStorage;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientAuthService {}
