import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopUseTagComponent } from '../../../trend/top-use-tag/top-use-tag.component';
import { TopLikePostComponent } from '../../../trend/top-like-post/top-like-post.component';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../../../../shared/components/tag/tag/tag.component';
import { UserHeaderComponent } from '../../../../shared/components/user/user-header/user-header.component';
import { PostOverviewComponent } from '../../../../shared/components/post/post-overview/post-overview.component';
import { PostOverviewAndAuthor } from '../../../../core/models/post';
import { Tag } from '../../../../core/models/tag';
import { Profile } from '../../../../core/models/user';
import { Subject, debounceTime } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { TagService } from '../../../../core/services/tag.service';
import { UserInformationService } from '../../../../core/services/user-information.service';

@Component({
  selector: 'MainSearchPage',
  standalone: true,
  imports: [
    CommonModule,
    TopUseTagComponent,
    TopLikePostComponent,
    FormsModule,
    TagComponent,
    UserHeaderComponent,
    PostOverviewComponent,
  ],
  templateUrl: './main-search-page.component.html',
  styleUrl: './main-search-page.component.scss',
})
export class MainSearchPageComponent {
  isSearched = false;

  searchText = '';

  ppas: PostOverviewAndAuthor[] = [];
  tags: Tag[] = [];
  users: Profile[] = [];

  private searchTextSubject = new Subject<void>();

  constructor(
    private postService: PostService,
    private tagService: TagService,
    private userInfoService: UserInformationService
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

    this.userInfoService
      .getProfilesByName(this.searchText)
      .subscribe((profiles) => (this.users = profiles));

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
