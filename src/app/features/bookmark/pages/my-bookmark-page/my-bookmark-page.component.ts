import { Component } from '@angular/core';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';

@Component({
  selector: 'app-my-bookmark-page',
  standalone: true,
  imports: [PostOverviewSectionComponent],
  templateUrl: './my-bookmark-page.component.html',
  styleUrl: './my-bookmark-page.component.scss',
})
export class MyBookmarkPageComponent {
}
