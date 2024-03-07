import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../../../../core/models/user';
import { ImageRepositoryService } from '../../../../core/repositories/image-repository.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { AvatarComponent } from '../../../../shared/components/user/avatar/avatar.component';
import { UserService } from '../../../../core/auth/user.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-profile-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarComponent],
  templateUrl: './profile-settings-page.component.html',
  styleUrl: './profile-settings-page.component.scss',
})
export class ProfileSettingsPageComponent {
  @ViewChild('editName') myTemplate!: TemplateRef<any>;

  user = inject(UserService);
  private toastService = inject(ToastService)

  newAvatarFile?: File;
  newAvatarSrc?: string;

  myProfile!: Profile;
  constructor(
    private userInformationService: UserInformationService,
    private imageRepo: ImageRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInformationService
      .getUserProfile(this.user.currentUser()?.userId!)
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
      .subscribe((newProfile) => {
        this.user.currentUser.set({ displayName: '', userId: '' });
        this.user.currentUser.set({
          displayName: newProfile.displayName,
          userId: newProfile.userId,
        });
          this.toastService.push({
            title: 'อัปเดตโปรไฟล์สำเร็จ',
            type: 'success',
            icon: 'done',
            life: 3000,
          });
        this.router.navigate(['/me'], { replaceUrl: true });
      });
  }
}
