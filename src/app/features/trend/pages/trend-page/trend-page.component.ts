import { Component } from '@angular/core';
import { TopLikePostComponent } from '../../top-like-post/top-like-post.component';
import { TopUseTagComponent } from '../../top-use-tag/top-use-tag.component';

@Component({
  selector: 'app-trend-page',
  standalone: true,
  imports: [TopLikePostComponent, TopUseTagComponent],
  templateUrl: './trend-page.component.html',
  styleUrl: './trend-page.component.scss'
})
export class TrendPageComponent {

}
