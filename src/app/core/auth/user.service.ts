import { Injectable, computed, inject, signal } from '@angular/core';
import { TokenService } from './token.service';
import { UserInformationService } from '../services/user-information.service';
import { DisplayName } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<DisplayName | null | undefined>(undefined);
  isLoggedIn = computed(() => !!this.currentUser());

  tokenService = inject(TokenService);
  userInfo = inject(UserInformationService);

  setUserFromToken() {
    const userId = this.tokenService.extractUserIdFromToken();
    if (!this.tokenService.isTokenValid()) {
      this.currentUser.set(null);
      return;
    }
    this.userInfo.getDisplayNames([userId!]).subscribe((info) => {
      this.currentUser.set(info[0]);
    });
  }
}
