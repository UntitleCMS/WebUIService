import { Component, Input } from '@angular/core';
import { UserHeaderComponent } from '../../users/user-header/user-header.component';
import { PostTitleComponent } from '../post-title/post-title.component';
import { PostDescriptionComponent } from '../post-description/post-description.component';
import { PostCoverComponent } from '../post-cover/post-cover.component';
import { PostContentComponent } from '../post-content/post-content.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    PostTitleComponent,
    PostDescriptionComponent,
    PostCoverComponent,
    PostContentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() isEditable = false;
  @Input({ required: true }) postAndAuthor!: PostAndAuthor;
  @Input() linkableAuthor = false
}
