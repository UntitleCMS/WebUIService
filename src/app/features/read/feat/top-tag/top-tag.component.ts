import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TagComponent } from '../../../../shared/components/tags/tag/tag.component';
import { TagService } from '../../../../core/services/tag.service';
import { Tag } from '../../../../core/models/tag';

@Component({
  selector: 'app-top-tag',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './top-tag.component.html',
  styleUrl: './top-tag.component.scss',
})
export class TopTagComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private tagService: TagService) {}
  ngOnInit(): void {
    this.tagService.getTopTags().subscribe((tags) => (this.tags = tags));
  }
}
