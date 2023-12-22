import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Token } from './token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private readonly tokenEndpoint = '/api/auth/v1/token';
  private readonly registerEndpoint = '/api/auth/v1/register';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(username: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let loginData = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
      scope: 'offline_access openid profile email',
    });

    return this.http
      .post<Token>(this.tokenEndpoint, loginData, { headers })
      .pipe(tap((res) => (this.tokenService.token = res)));
  }

  register(username: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let registerData = new URLSearchParams({
      username,
      password,
    });

    return this.http.post<Token>(this.registerEndpoint, registerData, {
      headers,
    });
  }
}
