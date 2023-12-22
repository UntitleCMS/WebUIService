import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY: string = 'auth_token';
  private _token_subject = new BehaviorSubject<Token | null>(this._localToken);

  get token() {
    return this._token_subject.getValue();
  }

  set token(value: Token | null) {
    this._token_subject.next(value);
    this._localToken = value;
  }

  get token$() {
    return this._token_subject.asObservable();
  }

  private get _localToken() {
    return this._tokenParser(localStorage.getItem(this.TOKEN_KEY));
  }

  private set _localToken(value: Token | null) {
    if (value) {
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  constructor() {
    this._trackTokenChange();
  }

  private _trackTokenChange() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.TOKEN_KEY) {
        let token: Token | null = this._tokenParser(event.newValue);
        this._token_subject.next(token);
      }
    });
  }

  private _tokenParser(token: string | null) {
    try {
      return JSON.parse(token!) as Token;
    } catch {
      return null;
    }
  }
}
