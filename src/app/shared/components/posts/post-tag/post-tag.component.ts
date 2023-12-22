import { Component, Input, OnInit } from '@angular/core';
import { TagFactoryComponent } from '../../tags/tag-factory/tag-factory.component';
import { Tag } from '../../../../core/models/tag';
import { PostDataService } from '../../../../core/services/post-data.service';
import { TagService } from '../../../../core/services/tag.service';

@Component({
  selector: 'app-post-tag',
  standalone: true,
  imports: [TagFactoryComponent],
  templateUrl: './post-tag.component.html',
  styleUrl: './post-tag.component.scss',
})
export class PostTagComponent implements OnInit {
  @Input() tags: string[] = [];

  existingTags: Tag[] = [];

  constructor(private pds: PostDataService, private tagService: TagService) {}

  ngOnInit(): void {
    this.existingTags = this.tagService.mapAllTags(this.tags);
    this.pds.tags = this.tags;
  }

  tagChange(tags: string[]) {
    this.pds.tags = tags;
  }
}
