import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarComponent } from '../../../shared/components/users/avatar/avatar.component';
import { AuthorityService } from '../../../core/auth/authority.service';
import { ClickInsideDirective } from '../../../shared/directives/click-inside.directive';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-mobile-account-button',
  standalone: true,
  imports: [
    CommonModule,
    ClickInsideDirective,
    ClickOutsideDirective,
    AvatarComponent,
  ],
  templateUrl: './mobile-account-button.component.html',
  styleUrl: './mobile-account-button.component.scss',
})
export class MobileAccountButtonComponent implements OnInit {
  isAccountMenuOpen = false;
  userId: string | null = null;

  constructor(private auth: AuthorityService) {}

  ngOnInit(): void {
    this.auth.user_id$.subscribe((userId) => (this.userId = userId));
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
