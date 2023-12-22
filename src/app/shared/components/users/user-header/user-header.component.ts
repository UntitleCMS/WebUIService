import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, AvatarComponent, RouterLink],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  @Input() linkable = false;
  @Input() userId: string | null = null;
  @Input({ required: true }) name = 'Simon Kennington';
}
