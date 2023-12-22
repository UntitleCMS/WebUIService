import { Component } from '@angular/core';
import { PostPreviewComponent } from '../../../../shared/components/posts/post-preview/post-preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-following-feed',
  standalone: true,
  imports: [CommonModule, PostPreviewComponent],
  templateUrl: './following-feed.component.html',
  styleUrl: './following-feed.component.scss',
})
export class FollowingFeedComponent {
  posts = [1,2,3,4,5,6,7,8,9,10]
}
