import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { UserService } from '../../../../core/auth/user.service';
import { AvatarComponent } from '../../../../shared/components/user/avatar/avatar.component';
import { Profile } from '../../../../core/models/user';
import { CommonModule } from '@angular/common';
import { FollowRelation } from '../../../../core/models/follow';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { ToastService } from '../../../../core/services/toast.service';
import { LazyPostService } from '../../../../core/services/lazy-post.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    PostOverviewSectionComponent,
    AvatarComponent,
    OverlayComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  user = inject(UserService);
  private userInfo = inject(UserInformationService);
  private toastService = inject(ToastService);
  private lazyPost = inject(LazyPostService);

  profile: Profile | undefined;
  follow: FollowRelation | null | undefined;

  isConfirmUnfollowPanelOpen = false;

  ngOnInit(): void {
    const userId$ = this.route.paramMap.pipe(
      map((paramMap) => {
        const userId = paramMap.get('userId');

        if (!userId) {
          throw new Error('Invalid user ID');
        }

        if (userId === this.user.currentUser()?.userId) {
          this.router.navigate(['/me'], { replaceUrl: true });
        }

        return userId;
      }),
      shareReplay()
    );

    userId$
      .pipe(switchMap((userId) => this.userInfo.getUserProfile(userId)))
      .subscribe((profile) => (this.profile = profile));

    userId$
      .pipe(switchMap((userId) => this.userInfo.getFollow(userId)))
      .subscribe((follow) => (this.follow = follow));
  }

  followThisUser() {
    if (!this.profile) {
      return;
    }
    this.userInfo.follow(this.profile?.userId!).subscribe(() => {
      this.toastService.push({
        icon: 'done',
        type: 'success',
        life: 2000,
        title: 'ติดตามสำเร็จ',
      });
      this.lazyPost.disposeMap();
      this.profile!.follower += 1;
      this.loadNewRelation();
    });
  }

  unFollowThisUser() {
    if (!this.profile) {
      return;
    }
    this.userInfo.unfollow(this.profile?.userId!).subscribe(() => {
      this.toastService.push({
        icon: 'done',
        type: 'success',
        life: 2000,
        title: 'ยกเลิกติดตามสำเร็จ',
      });
      this.profile!.follower -= 1;
      this.lazyPost.disposeMap();
      this.closeConfirmUnfollowPanel();
      this.loadNewRelation();
    });
  }

  loadNewRelation() {
    this.userInfo.getFollow(this.profile?.userId!).subscribe((follow) => {
      this.follow = follow;
    });
  }

  openConfirmUnfollowPanel() {
    this.isConfirmUnfollowPanelOpen = true;
  }

  closeConfirmUnfollowPanel() {
    this.isConfirmUnfollowPanelOpen = false;
  }
}
