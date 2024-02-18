import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthorityService } from '../../core/auth/authority.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { NavLinkComponent } from '../components/nav-link/nav-link.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';
import { LoginButtonComponent } from '../components/login-button/login-button.component';
import { BrandComponent } from '../components/brand/brand.component';
import { MobileAccountButtonComponent } from '../components/mobile-account-button/mobile-account-button.component';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [
    CommonModule,
    BrandComponent,
    NavLinkComponent,
    MobileAccountButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss',
})
export class MobileNavigationComponent implements OnInit {
  isLoggedIn = false;
  lastScrollTop = 0;
  isScrollDown = false;
  safeScrollZone = 64;
  isAccountMenuOpen = false;

  isScrolledFromOrigin = false;

  isMenuOpen = false;

  constructor(private auth: AuthorityService, private oauth: OAuthService) {}

  ngOnInit(): void {
    this.auth.isLoggedin$.subscribe((status) => (this.isLoggedIn = status));
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY;

    this.isScrolledFromOrigin = scrollTop > 0;

    if (scrollTop <= this.safeScrollZone) {
      this.isScrollDown = false;
      return;
    }

    this.isScrollDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
