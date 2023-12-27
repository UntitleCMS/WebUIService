import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';

@Component({
  selector: 'app-tag-search',
  standalone: true,
  imports: [LazyPostGeneratorComponent],
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
          const tagId = params.get('tagId');
          if (!tagId) {
            throw new Error('Invalid Tag ID');
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
