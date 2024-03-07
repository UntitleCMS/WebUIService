import { Component, Input } from '@angular/core';
import { PostTitleComponent } from '../post-title/post-title.component';
import { PostDescriptionComponent } from '../post-description/post-description.component';
import { PostTagComponent } from '../post-tag/post-tag.component';
import { PostCoverComponent } from '../post-cover/post-cover.component';
import { PostContentComponent } from '../post-content/post-content.component';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from '../../user/user-header/user-header.component';
import { PostAndAuthor } from '../../../../core/models/post';

@Component({
  selector: 'Post',
  standalone: true,
  imports: [
    CommonModule,
    PostTitleComponent,
    PostDescriptionComponent,
    PostTagComponent,
    PostCoverComponent,
    PostContentComponent,
    UserHeaderComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true }) postAndAuthor!: PostAndAuthor;

  @Input() isEditable = false;
}
