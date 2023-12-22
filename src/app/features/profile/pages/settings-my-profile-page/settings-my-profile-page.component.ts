import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Profile } from '../../../../core/models/user';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Router } from '@angular/router';
import { ImageRepositoryService } from '../../../../core/repositories/image-repository.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from '../../../../shared/components/users/avatar/avatar.component';

@Component({
  selector: 'app-settings-my-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AvatarComponent],
  templateUrl: './settings-my-profile-page.component.html',
  styleUrl: './settings-my-profile-page.component.scss',
})
export class SettingsMyProfilePageComponent {
  @ViewChild('editName') myTemplate!: TemplateRef<any>;

  newAvatarFile?: File;
  newAvatarSrc?: string;

  myProfile!: Profile;
  constructor(
    private authority: AuthorityService,
    private userInformationService: UserInformationService,
    private imageRepo: ImageRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInformationService
      .getUserProfile(this.authority.user_id!)
      .subscribe({
        next: (profile) => (this.myProfile = profile),
      });
  }

  onAvatarChange(e: Event) {
    let el = e.target as HTMLInputElement;
    this.newAvatarFile = el.files![0];
    this.newAvatarSrc = URL.createObjectURL(this.newAvatarFile!);
  }

  clearCoverImage() {
    this.newAvatarFile = undefined;
    this.newAvatarSrc = undefined;
  }

  updateProfile() {
    if (this.newAvatarFile) {
      const formData = new FormData();
      formData.append('avatar', this.newAvatarFile);
      this.imageRepo.updateAvatar(formData).subscribe();
    }
    this.userInformationService
      .updateProfile({
        displayName: this.myProfile.displayName,
        shortBio: this.myProfile.shortBio,
      })
      .subscribe(() => {
        this.router.navigate(['/profile', 'me'], { replaceUrl: true });
      });
  }
}
