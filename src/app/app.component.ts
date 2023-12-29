import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './core/auth/client-auth.service';
import { filter, tap } from 'rxjs';
import { TokenService } from './core/auth/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'betablog';

  constructor(
    private oauth: OAuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.oauth.configure(authCodeFlowConfig);
    this.oauth.loadDiscoveryDocumentAndTryLogin();
    this.oauth.setupAutomaticSilentRefresh();

    this.oauth.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.tokenService.nextToken());
  }
}
