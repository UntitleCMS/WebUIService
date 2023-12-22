import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-plain-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './plain-layout.component.html',
  styleUrl: './plain-layout.component.scss',
})
export class PlainLayoutComponent {}
