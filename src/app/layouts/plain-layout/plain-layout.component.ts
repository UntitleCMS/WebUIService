import { CommonModule, Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-plain-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './plain-layout.component.html',
  styleUrl: './plain-layout.component.scss',
})
export class PlainLayoutComponent {
  isScrollDown = false;
  lastScrollTop = 0;

  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY;
    this.isScrollDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;
  }
}
