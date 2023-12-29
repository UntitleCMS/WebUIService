import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Token } from './token';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // private readonly TOKEN_KEY: string = 'auth_token';
  private _token_subject = new BehaviorSubject<string | null>(this._localToken);

  get token() {
    return this._token_subject.getValue();
  }

  set token(value: string | null) {
    this._token_subject.next(value);
  }

  get token$() {
    return this._token_subject.asObservable();
  }

  private get _localToken() {
    return this.oauth.getAccessToken();
  }

  constructor(private oauth: OAuthService) {
    // this._token_subject.next();
  }

  revokeToken() {
    this.oauth.logOut();
    this._token_subject.next(null);
  }

  nextToken() {
    this._token_subject.next(this._localToken);
  }
}
