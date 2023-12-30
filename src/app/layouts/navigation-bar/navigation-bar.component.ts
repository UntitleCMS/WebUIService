import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorityService } from '../../core/auth/authority.service';
import { BrandComponent } from '../components/brand/brand.component';
import { NavLinkComponent } from '../components/nav-link/nav-link.component';
import { LoginButtonComponent } from '../components/login-button/login-button.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';
import { ExpandButtonComponent } from '../components/expand-button/expand-button.component';
import { UserPanelComponent } from '../components/user-panel/user-panel.component';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BrandComponent,
    NavLinkComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    ExpandButtonComponent,
    UserPanelComponent,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn = true;
  isExpanded = false;

  constructor(private auth: AuthorityService) {}

  ngOnInit(): void {
    this.auth.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
