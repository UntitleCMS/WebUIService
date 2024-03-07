import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';

@Component({
  selector: 'FollowingFeedPage',
  standalone: true,
  imports: [CommonModule, PostOverviewSectionComponent],
  templateUrl: './following-feed-page.component.html',
  styleUrl: './following-feed-page.component.scss',
})
export class FollowingFeedPageComponent {
}
