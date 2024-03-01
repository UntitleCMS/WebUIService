import { Component, Input, OnInit } from '@angular/core';
import { UserHeaderComponent } from '../../users/user-header/user-header.component';
import { RouterLink } from '@angular/router';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { CoverComponent } from '../cover/cover.component';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../tags/tag/tag.component';
import { TagService } from '../../../../core/services/tag.service';
import { Tag } from '../../../../core/models/tag';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PostOptionsComponent } from '../post-options/post-options.component';
import { AuthorityService } from '../../../../core/auth/authority.service';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [
    CommonModule,
    UserHeaderComponent,
    RouterLink,
    CoverComponent,
    TagComponent,
    RelativeTimePipe,
    PostOptionsComponent,
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
})
export class PostPreviewComponent implements OnInit {
  @Input({ required: true }) postPreviewAndAuthor!: PostPreviewAndAuthor;

  isMediumScreen = false;

  synthTags: Tag[] = [];

  currentUserId: string | null = null;

  constructor(
    private tagService: TagService,
    private bpo: BreakpointObserver,
    private auth: AuthorityService
  ) {}

  ngOnInit(): void {
    this.bpo
      .observe('(min-width: 768px)')
      .subscribe((status) => (this.isMediumScreen = status.matches));
    this.synthTags = this.tagService.mapAllTags(
      this.postPreviewAndAuthor.postPreview.tags
    );
    this.auth.user_id$.subscribe((userId) => (this.currentUserId = userId));
  }
}
