import { Component, Input } from '@angular/core';
import { PostTitleComponent } from '../post-title/post-title.component';
import { PostDescriptionComponent } from '../post-description/post-description.component';
import { PostTagComponent } from '../post-tag/post-tag.component';
import { PostCoverComponent } from '../post-cover/post-cover.component';
import { PostContentComponent } from '../post-content/post-content.component';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  postAndAuthor = {
    post: {
      title: 'Hello',
      description: 'Description',
      coverImage: undefined,
      tags: ['HTML', 'CSS', 'JS'],
      content:
        '{"time":1709592159194,"blocks":[{"id":"Dc5tfMGuua","type":"paragraph","data":{"text":"kforkofkrpkfprkfpf4fp4f4"}}],"version":"2.29.0"}',
    },
  };

  @Input() isEditable = false;
}
