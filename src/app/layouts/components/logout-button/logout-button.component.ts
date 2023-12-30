import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthorityService } from '../../../core/auth/authority.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  @Input() isExpanded: boolean = false;

  constructor(private auth: AuthorityService) {}

  logout() {
    if (confirm('คุณกำลังจะออกจากระบบใช่หรือไม่')) {
      this.auth.logout();
    }
  }
}
