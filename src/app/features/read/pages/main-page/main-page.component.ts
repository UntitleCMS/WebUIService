import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../../components/landing/landing.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { TopTagComponent } from '../../feat/top-tag/top-tag.component';
import { TopLovePostComponent } from '../../feat/top-love-post/top-love-post.component';

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

  constructor(private auth: AuthorityService) {}

  ngOnInit(): void {
    this.auth.isLoggedin$.subscribe((status) => (this.isLoggedIn = status));
  }
}
