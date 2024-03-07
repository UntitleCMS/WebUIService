import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../../../core/auth/user.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { AvatarComponent } from '../../../../shared/components/user/avatar/avatar.component';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile-page',
  standalone: true,
  imports: [CommonModule, PostOverviewSectionComponent, AvatarComponent, RouterLink],
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.scss',
})
export class MyProfilePageComponent {
  private user = inject(UserService);
  private userInfo = inject(UserInformationService);

  profile = computed(() => {
    const user = this.user.currentUser();
    if (!user) return user;
    return this.userInfo.getUserProfile(user.userId);
  });
}
