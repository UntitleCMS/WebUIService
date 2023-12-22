import { Injectable } from '@angular/core';
import { UserInformationRepositoryService } from '../repositories/user-information-repository.service';
import { ProfileUpdateDto } from '../models/user';
import { map, tap } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserInformationService {
  constructor(
    private userInformationRepo: UserInformationRepositoryService,
    private cacheService: CacheService
  ) {}

  getUserProfile(userId: string) {
    return this.userInformationRepo.getProfileById(userId).pipe(
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
    return this.userInformationRepo.updateProfile(profileUpdate);
  }

  getDisplayName(userIds: string[]) {
    return this.userInformationRepo.getDisplayNameByIds(userIds);
  }

  follow(userId: string) {
    return this.userInformationRepo
      .follow(userId)
      .pipe(
        tap({
          next: () => this.cacheService.hadleCachingOnFollowUser(userId),
        })
      );
  }

  unfollow(userId: string) {
    return this.userInformationRepo.unfollow(userId);
  }

  getFollow(userId: string) {
    return this.userInformationRepo.getFollow(userId);
  }

  getFollowers(userId: string) {
    return this.userInformationRepo.getFollowersOf(userId);
  }

  getFollowees(userId: string) {
    return this.userInformationRepo.getFolloweesOf(userId);
  }
}
