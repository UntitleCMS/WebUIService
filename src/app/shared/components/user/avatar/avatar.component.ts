import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'Avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() size = 8;
  @Input({ required: true }) userId: string | null = null;

  defaultAvatar = 'assets/images/default-avatar.svg';
  avatarEndpoint = 'api/img/v1/avatar/';

  onImageNotFound(e: Event) {
    let imgEl = e.target as HTMLImageElement;
    imgEl.src = this.defaultAvatar;
    imgEl.onerror = null;
  }
}
