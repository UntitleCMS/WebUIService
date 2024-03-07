import { Component, OnInit, inject } from '@angular/core';
import { TagComponent } from '../../../shared/components/tag/tag/tag.component';
import { Tag } from '../../../core/models/tag';
import { TagService } from '../../../core/services/tag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'TopUseTag',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './top-use-tag.component.html',
  styleUrl: './top-use-tag.component.scss',
})
export class TopUseTagComponent implements OnInit {
  tags: Tag[] = [];

  tagService = inject(TagService);

  ngOnInit(): void {
    this.tagService.getTopTags().subscribe((tags) => (this.tags = tags));
  }
}
