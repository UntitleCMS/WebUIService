import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../../components/landing/landing.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { TopTagComponent } from '../../feat/top-tag/top-tag.component';
import { TopLovePostComponent } from '../../feat/top-love-post/top-love-post.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LandingComponent,
    TopTagComponent,
    TopLovePostComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  isLoggedIn = false;

  isLargeScreen = false;

  constructor(
    private auth: AuthorityService,
    private bpo: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.auth.isLoggedin$.subscribe((status) => (this.isLoggedIn = status));
    this.bpo
      .observe('(min-width: 1024px)')
      .subscribe((status) => (this.isLargeScreen = status.matches));
  }
}
