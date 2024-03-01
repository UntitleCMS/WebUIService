import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';

@Component({
  selector: 'app-following-feed',
  standalone: true,
  imports: [CommonModule, LazyPostGeneratorComponent],
  templateUrl: './following-feed.component.html',
  styleUrl: './following-feed.component.scss',
})
export class FollowingFeedComponent {
}
