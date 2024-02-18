import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthorityService } from '../../../core/auth/authority.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  @Input() isExpanded: boolean = false;
  @Input() variant: 'desktop' | 'mobile' = 'desktop';

  constructor(
    private auth: AuthorityService,
    private router: Router,
    private toastService: ToastService
  ) {}

  logout() {
    if (confirm('คุณกำลังจะออกจากระบบใช่หรือไม่')) {
      this.auth.logout();
      this.toastService.push({
        title: 'ออกจากระบบแล้ว',
        type: 'success',
        icon: 'done',
      });
      this.router.navigate(['/']);
    }
  }
}
