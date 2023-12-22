import { Component, OnInit } from '@angular/core';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';
import { AvatarComponent } from '../../../../shared/components/users/avatar/avatar.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { UserInformationRepositoryService } from '../../../../core/repositories/user-information-repository.service';
import { Profile } from '../../../../core/models/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    LazyPostGeneratorComponent,
    RouterLink,
  ],
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.scss',
})
export class MyProfilePageComponent implements OnInit {
  userProfile!: Profile;

  constructor(
    private auth: AuthorityService,
    private userInformationService: UserInformationRepositoryService
  ) {}

  ngOnInit(): void {
    this.userInformationService
      .getProfileById(this.auth.user_id!)
      .subscribe((profile) => (this.userProfile = profile!));
  }
}
