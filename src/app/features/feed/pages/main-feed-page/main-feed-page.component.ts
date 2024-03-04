import { Component } from '@angular/core';
import { LandingPageComponent } from '../../../landing/pages/landing-page/landing-page.component';

@Component({
  selector: 'MainFeedPage',
  standalone: true,
  imports: [LandingPageComponent],
  templateUrl: './main-feed-page.component.html',
  styleUrl: './main-feed-page.component.scss',
})
export class MainFeedPageComponent {}
