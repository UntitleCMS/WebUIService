import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Profile } from '../../../../core/models/user';
import { AvatarComponent } from '../../../../shared/components/users/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { FollowButtonComponent } from '../../../../shared/components/users/follow-button/follow-button.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    LazyPostGeneratorComponent,
    FollowButtonComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  userProfile!: Profile;
  isLoggedIn = false;
  myId: string | null = null;
  followStatus = false;

  constructor(
    private route: ActivatedRoute,
    private authority: AuthorityService,
    private userInformationService: UserInformationService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authority.isLoggedin;
    this.myId = this.authority.user_id;

    this.route.paramMap
      .pipe(
        map((params) => {
          const userId = params.get('userId');
          if (!userId) {
            throw new Error('Invalid User ID');
          }
          return userId;
        }),
        switchMap((userId) =>
          this.userInformationService.getUserProfile(userId)
        ),
        tap((profile) => {
          this.userProfile = profile;
          console.log(profile);
          
        }),
        filter(() => this.isLoggedIn),
        switchMap((profile) =>
          this.userInformationService.getFollow(profile.userId)
        ),
        tap((fs) => console.log(fs)),
        tap((followStatus) => (this.followStatus = !!followStatus))
      )
      .subscribe();
  }

  follow() {
    this.userInformationService.follow(this.userProfile.userId).subscribe({
      next: () => {
        this.followStatus = true;
        this.userProfile.follower += 1;
      },
      error: (e) => {
        if (e.status === 409) {
          this.followStatus = true;
        }
      },
    });
  }

  unfollow() {
    this.userInformationService.unfollow(this.userProfile.userId).subscribe({
      next: () => {
        this.followStatus = false;
        this.userProfile.follower -= 1;
      },
      error: (e) => {
        if (e.status === 409) {
          this.followStatus = false;
        }
      },
    });
  }
}
