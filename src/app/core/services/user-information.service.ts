import { Injectable, inject } from '@angular/core';
import { UserInformationRepositoryService } from '../repositories/user-information.repository.service';
import { map } from 'rxjs';
import { ProfileUpdateDto } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserInformationService {
  private userInfoRepo = inject(UserInformationRepositoryService);

  getDisplayNames(ids: string[]) {
    return this.userInfoRepo.getDisplayNameByIds(ids);
  }

  getUserProfile(userId: string) {
    return this.userInfoRepo.getProfileById(userId).pipe(
      map(
        (profile) =>
          profile || {
            userId,
            displayName: userId,
            shortBio: '',
            followee: 0,
            follower: 0,
          }
      )
    );
  }

  updateProfile(profileUpdate: ProfileUpdateDto) {
    return this.userInfoRepo.updateProfile(profileUpdate);
  }

  getDisplayName(userIds: string[]) {
    return this.userInfoRepo.getDisplayNameByIds(userIds);
  }

  follow(userId: string) {
    return this.userInfoRepo.follow(userId);
  }

  unfollow(userId: string) {
    return this.userInfoRepo.unfollow(userId);
  }

  getFollow(userId: string) {
    return this.userInfoRepo.getFollow(userId);
  }

  getFollowers(userId: string) {
    return this.userInfoRepo.getFollowersOf(userId);
  }

  getFollowees(userId: string) {
    return this.userInfoRepo.getFolloweesOf(userId);
  }

  getProfilesByName(keyword: string) {
    return this.userInfoRepo.getProfilesByKeyword(keyword);
  }
}
