export interface FollowRelation {
  followerId: string;
  followeeId: string;
}

export interface Followers {
  followeeId: string;
  followerIds: string[];
}

export interface Followees {
  followerId: string;
  followeeIds: string[];
}
