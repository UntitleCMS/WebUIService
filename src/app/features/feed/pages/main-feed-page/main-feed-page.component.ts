import { Component } from '@angular/core';
import { LandingPageComponent } from '../../../landing/pages/landing-page/landing-page.component';
import { CommonModule } from '@angular/common';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';

@Component({
  selector: 'MainFeedPage',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
    PostOverviewSectionComponent,
  ],
  templateUrl: './main-feed-page.component.html',
  styleUrl: './main-feed-page.component.scss',
})
export class MainFeedPageComponent {
}
