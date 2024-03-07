import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';

@Component({
  selector: 'app-tag-search',
  standalone: true,
  imports: [PostOverviewSectionComponent],
  templateUrl: './tag-search.component.html',
  styleUrl: './tag-search.component.scss',
})
export class TagSearchComponent implements OnInit {
  tag = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          const tagId = params.get('tagName');
          if (!tagId) {
            throw new Error('Invalid Tag Name');
          }
          return tagId;
        }),
        tap((tag) => (this.tag = tag))
      )
      .subscribe((tag) => {
        console.log(tag);
      });
  }
}
