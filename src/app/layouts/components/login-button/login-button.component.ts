import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent {
  @Input() isExpanded: boolean = false;
  @Input() variant: 'desktop' | 'mobile' = 'desktop';

  constructor(private oauth: OAuthService) {}

  login() {
    this.oauth.loadDiscoveryDocumentAndLogin();
  }
}
