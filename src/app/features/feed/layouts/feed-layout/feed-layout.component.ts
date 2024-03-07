import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { LandingPageComponent } from '../../../landing/pages/landing-page/landing-page.component';
import { RouterOutlet } from '@angular/router';
import { TopUseTagComponent } from '../../../trend/top-use-tag/top-use-tag.component';
import { TopLikePostComponent } from '../../../trend/top-like-post/top-like-post.component';
import { UserService } from '../../../../core/auth/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'FeedLayout',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
    RouterOutlet,
    TopUseTagComponent,
    TopLikePostComponent,
  ],
  templateUrl: './feed-layout.component.html',
  styleUrl: './feed-layout.component.scss',
})
export class FeedLayoutComponent {
  @ViewChild('feed') mainView!: ElementRef<HTMLElement>;

  isLoggedIn = inject(UserService).isLoggedIn;

  scrollToMainView() {
    this.mainView.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
