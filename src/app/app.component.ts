import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './core/auth/oauth.config';
import { filter } from 'rxjs';
import { UserService } from './core/auth/user.service';
import { NavBarComponent } from './layouts/nav/nav-bar/nav-bar.component';
import { ToastContainerComponent } from './shared/components/utils/toast-container/toast-container.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    LoadingBarModule,
    ToastContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'betablog';

  oauth = inject(OAuthService);
  userService = inject(UserService);
  toastService = inject(ToastService);

  ngOnInit(): void {
    this.oauth.configure(authCodeFlowConfig);
    this.oauth.loadDiscoveryDocumentAndTryLogin();

    this.oauth.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        this.toastService.push({
          title: 'เข้าสู่ระบบสำเร็จ',
          type: 'success',
          icon: 'done',
          life: 3000
        });
        this.userService.setUserFromToken();
      });

    this.userService.setUserFromToken();
  }
}
