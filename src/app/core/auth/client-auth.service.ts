import { Injectable } from '@angular/core';
import { AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://p.villsource.tk/api/auth/v2',
  redirectUri: window.location.origin,
  clientId: 'console',
  responseType: 'code',
  scope: ' ',
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
