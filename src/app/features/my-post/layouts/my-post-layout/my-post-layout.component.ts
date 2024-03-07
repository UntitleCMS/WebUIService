import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-post-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './my-post-layout.component.html',
  styleUrl: './my-post-layout.component.scss'
})
export class MyPostLayoutComponent {

}
