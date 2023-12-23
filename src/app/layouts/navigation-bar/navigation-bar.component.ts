import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from '../../shared/components/users/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { AuthorityService } from '../../core/auth/authority.service';
import { UserInformationService } from '../../core/services/user-information.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../../core/auth/client-auth.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AvatarComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn = false;
  isExpanded = false;

  userId: string | null = null;
  name = '';

  constructor(
    private auth: AuthorityService,
    private userInformationService: UserInformationService,
    private oauth: OAuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedin;
    this.userId = this.auth.user_id;
    if (this.userId) {
      this.userInformationService
        .getDisplayName([this.userId])
        .subscribe((name) => (this.name = name[0].displayName));
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    this.oauth.configure(authCodeFlowConfig);
    this.oauth.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
