import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { menu } from '../../../menu';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { UserService } from '../../../core/auth/user.service';
import { UserHeaderComponent } from '../../../shared/components/user/user-header/user-header.component';

@Component({
  selector: 'NavBar',
  standalone: true,
  imports: [CommonModule, NavButtonComponent, UserHeaderComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private auth = inject(AuthenticationService);
  userService = inject(UserService);

  isLoggedIn = this.userService.isLoggedIn;
  isExpanded = true;

  get menu() {
    return menu;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
