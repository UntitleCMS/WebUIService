import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from '../../shared/components/users/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { AuthorityService } from '../../core/auth/authority.service';
import { UserInformationService } from '../../core/services/user-information.service';
import { OAuthService } from 'angular-oauth2-oidc';

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
    this.auth.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.auth.user_id$.subscribe((uid) => (this.userId = uid));
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
    this.oauth.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    if (confirm('คุณกำลังจะออกจากระบบใช่หรือไม่')) {
      this.auth.logout();
    }
  }
}
