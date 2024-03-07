import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'UserHeader',
  standalone: true,
  imports: [CommonModule, AvatarComponent, RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  @Input() avatarOnly = false;
  @Input() fontSize: 'small' | 'medium' = 'small';
  @Input() linkable = true;
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
}
