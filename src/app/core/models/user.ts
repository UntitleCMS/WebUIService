export interface User {
    id: string;
    username: string;
  }
  
  export interface DisplayName {
    userId: string;
    displayName: string;
  }
  
  export interface Profile extends DisplayName {
    shortBio: string;
    follower: number;
    followee: number;
  }
  
  export interface UserAndProfile {
    user: User;
    profile: Profile;
  }
  
  export interface ProfileUpdateDto extends Partial<Profile> {}
  