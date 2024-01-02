import { Component } from '@angular/core';
import { PostPreviewComponent } from '../../../../shared/components/posts/post-preview/post-preview.component';
import { CommonModule } from '@angular/common';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { TagService } from '../../../../core/services/tag.service';
import { Tag } from '../../../../core/models/tag';
import { TagComponent } from '../../../../shared/components/tags/tag/tag.component';
import { TopLovePostComponent } from '../../../read/feat/top-love-post/top-love-post.component';
import { TopTagComponent } from '../../../read/feat/top-tag/top-tag.component';

@Component({
  selector: 'app-one-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostPreviewComponent,
    TagComponent,
    TopTagComponent,
    TopLovePostComponent
  ],
  templateUrl: './one-search.component.html',
  styleUrl: './one-search.component.scss',
})
export class OneSearchComponent {
  isSearched = false;

  searchText = '';

  ppas: PostPreviewAndAuthor[] = [];
  tags: Tag[] = [];

  private searchTextSubject = new Subject<void>();

  constructor(
    private postService: PostService,
    private tagService: TagService
  ) {
    this.searchTextSubject.pipe(debounceTime(500)).subscribe(() => {
      this.search();
    });
  }

  onSearchTextChange(): void {
    this.searchTextSubject.next();
  }

  search() {
    if (!this.searchText.length) return;
    this.isSearched = true;

    this.postService
      .getAllPosts({
        size: 20,
        pivot: null,
        searchText: this.searchText,
      })
      .subscribe((ppas) => (this.ppas = ppas));

    this.tagService
      .getTags({ size: 20, include: this.searchText })
      .subscribe((tags) => {
        this.tags = this.tagService.mapAllTags(tags.map((tag) => tag.key));
      });
  }
}
