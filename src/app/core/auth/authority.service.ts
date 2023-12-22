import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class AuthorityService {
  private _user_id = new BehaviorSubject<string | null>(null);
  private _is_loggedin = new BehaviorSubject<boolean>(false);

  get user_id() {
    return this._user_id.getValue();
  }
  get user_id$() {
    return this._user_id.asObservable();
  }

  get isLoggedin() {
    return this._is_loggedin.getValue();
  }
  get isLoggedin$() {
    return this._is_loggedin.asObservable();
  }

  constructor(private _tokenService: TokenService) {
    this.loadToken();
  }

  public logout() {
    this._tokenService.token = null;
  }

  private loadToken() {
    this._tokenService.token$
      .pipe(tap(this.extractUsetId), tap(this.checkIsLoggedIn))
      .subscribe();
  }

  private extractUsetId = (token: Token | null) => {
    let uid: string | null = null;
    if (!!token) {
      uid = JSON.parse(atob(token?.access_token.split('.')[1]))[
        'sub-b64'
      ] as string;
    }
    this._user_id.next(uid);
  };

  private checkIsLoggedIn = (token: Token | null) => {
    this._is_loggedin.next(!!token);
  };
}
