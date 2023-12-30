import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AvatarComponent } from '../../../shared/components/users/avatar/avatar.component';
import { AuthorityService } from '../../../core/auth/authority.service';
import { map, switchMap, tap } from 'rxjs';
import { UserInformationService } from '../../../core/services/user-information.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  userId = '';
  displayName = '';

  constructor(
    private auth: AuthorityService,
    private userInformationService: UserInformationService
  ) {}

  ngOnInit(): void {
    this.auth.user_id$
      .pipe(
        map((uid) => {
          if (!uid) {
            throw new Error('Invalid user');
          }
          return uid;
        }),
        switchMap((uid) => this.userInformationService.getDisplayName([uid])),
        map((profiles) => {
          if (!(profiles.length > 0)) {
            throw new Error('No profiles found');
          }
          return profiles[0];
        }),
        tap(({ userId, displayName }) => {
          this.userId = userId;
          this.displayName = displayName;
        })
      )
      .subscribe();
  }
}
