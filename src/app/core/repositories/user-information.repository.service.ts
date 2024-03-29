import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DisplayName, Profile, ProfileUpdateDto } from '../models/user';
import { FollowRelation, Followees, Followers } from '../models/follow';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserInformationRepositoryService {
  private readonly profileEndpoint = '/api/user/v1/profiles';
  private readonly followEndpoint = '/api/user/v1/follows';

  private http = inject(HttpClient);
  private token = inject(TokenService);

  getProfileById(userId: string) {
    return this.http.get<Profile | null>(`${this.profileEndpoint}/${userId}`);
  }

  getDisplayNameByIds(userIds: string[]) {
    let params = new HttpParams();
    for (let id of userIds) {
      params = params.append('uid', id);
    }

    return this.http.get<DisplayName[]>(`${this.profileEndpoint}/displayName`, {
      params,
    });
  }

  updateProfile(profileUpdate: ProfileUpdateDto) {
    return this.http.patch<Profile>(
      `${this.profileEndpoint}`,
      profileUpdate,
      //dev
      { params: this.subQuery() }
    );
  }

  follow(userId: string) {
    return this.http.post<FollowRelation>(
      `${this.followEndpoint}/${userId}/follow`,
      {},
      //dev
      { params: this.subQuery() }
    );
  }

  unfollow(userId: string) {
    return this.http.delete(
      `${this.followEndpoint}/${userId}/unfollow`,
      //dev
      { params: this.subQuery() }
    );
  }

  getFollow(userId: string) {
    return this.http.get<FollowRelation | null>(
      `${this.followEndpoint}/${userId}`,
      { params: this.subQuery() }
    );
  }

  getFollowersOf(userId: string) {
    return this.http.get<Followers>(
      `${this.followEndpoint}/${userId}/followers`
    );
  }

  getFolloweesOf(userId: string) {
    return this.http.get<Followees>(
      `${this.followEndpoint}/${userId}/followees`
    );
  }

  getProfilesByKeyword(keyword: string) {
    return this.http.get<Profile[]>(`${this.profileEndpoint}/search`, {
      params: { keyword },
    });
  }

  //Mock Sub query for Dev
  private subQuery() {
    const userId = this.token.extractUserIdFromToken();
    return new HttpParams().append('sub', userId || 'null');
  }
}
