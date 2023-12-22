import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  @Input() size = 8;
  @Input({ required: true }) userId: string | null = null;

  defaultAvatar = 'assets/images/default-avatar.svg';
  avatarEndpoint = 'api/img/v1/avatar/';
  src = '';

  ngOnInit(): void {
    this.src = this.userId
      ? this.avatarEndpoint + this.userId
      : this.defaultAvatar;
  }

  onImageNotFound(e: Event) {
    let imgEl = e.target as HTMLImageElement;
    imgEl.src = this.defaultAvatar;
    imgEl.onerror = null;
  }
}
