import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavButtonComponent } from './layouts/nav/nav-button/nav-button.component';
import { menu } from './menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'betablog';

  isLoggedIn = true;

  get menu() {
    return menu;
  }
  isExpanded = true;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}