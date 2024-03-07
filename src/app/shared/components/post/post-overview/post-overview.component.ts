import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TagComponent } from '../../tag/tag/tag.component';
import { CommonModule } from '@angular/common';
import { PostOverviewAndAuthor } from '../../../../core/models/post';
import { CoverImageComponent } from '../cover-image/cover-image.component';
import { UserHeaderComponent } from '../../user/user-header/user-header.component';
import { RouterLink } from '@angular/router';
import { PostOptionsComponent } from '../post-options/post-options.component';
import { TagPipe } from '../../../pipes/tag.pipe';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { UserService } from '../../../../core/auth/user.service';
import { LoveButtonDirective } from '../../../directives/love-button.directive';
import { BookmarkButtonDirective } from '../../../directives/bookmark-button.directive';

@Component({
  selector: 'PostOverview',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    TagComponent,
    CoverImageComponent,
    RouterLink,
    PostOptionsComponent,
    TagPipe,
    RelativeTimePipe,
    LoveButtonDirective,
    BookmarkButtonDirective
  ],
  templateUrl: './post-overview.component.html',
  styleUrl: './post-overview.component.scss',
})
export class PostOverviewComponent {
  @Input({ required: true }) postOverviewAndAuthor!: PostOverviewAndAuthor;
  @Input() linkable = true;
  @Output() delete = new EventEmitter<PostOverviewAndAuthor>();

  user = inject(UserService);

  like(b: boolean) {
    this.postOverviewAndAuthor.post.isLiked = b;
  }

  bookmark(b: boolean) {
    this.postOverviewAndAuthor.post.isSaved = b
  }

  deleteThisPost() {
    this.delete.emit(this.postOverviewAndAuthor)
  }
}
