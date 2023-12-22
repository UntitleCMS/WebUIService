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

  synthTags: Tag[] = [];

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.synthTags = this.tagService.mapAllTags(
      this.postPreviewAndAuthor.postPreview.tags
    );
  }
}
