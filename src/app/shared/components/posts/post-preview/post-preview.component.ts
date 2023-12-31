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
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
})
export class PostPreviewComponent implements OnInit {
  @Input({ required: true }) postPreviewAndAuthor!: PostPreviewAndAuthor;

  isMediumScreen = false;

  synthTags: Tag[] = [];

  constructor(private tagService: TagService, private bpo: BreakpointObserver) {}

  ngOnInit(): void {
    this.bpo.observe('(min-width: 768px)').subscribe(status => this.isMediumScreen = status.matches)
    this.synthTags = this.tagService.mapAllTags(
      this.postPreviewAndAuthor.postPreview.tags
    );
  }
}
