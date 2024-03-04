import { Component, ElementRef, ViewChild } from '@angular/core';
import { LandingPageComponent } from '../../../landing/pages/landing-page/landing-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'FeedLayout',
  standalone: true,
  imports: [LandingPageComponent, RouterOutlet],
  templateUrl: './feed-layout.component.html',
  styleUrl: './feed-layout.component.scss'
})
export class FeedLayoutComponent {
  @ViewChild('feed') mainView!: ElementRef<HTMLElement>;

  scrollToMainView() {
    this.mainView.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
