import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MobileNavigationComponent } from '../mobile-navigation/mobile-navigation.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationBarComponent,
    MobileNavigationComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  isLargeScreen = false;

  constructor(private bpo: BreakpointObserver) {}

  ngOnInit(): void {
    this.bpo
      .observe('(min-width: 768px)')
      .subscribe((state) => (this.isLargeScreen = state.matches));
  }
}
