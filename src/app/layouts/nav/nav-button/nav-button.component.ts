import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'NavButton',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent {
  @Input() isExpanded = false;
  @Input() to: string[] = ['/'];
  @Input() icon: string = 'home';
  @Input() label: string = 'Home';
  @Input() exact: boolean = false;
}
