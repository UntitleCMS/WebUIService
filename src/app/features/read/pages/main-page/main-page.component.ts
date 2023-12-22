import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tag } from '../../../../core/models/tag';
import { TagService } from '../../../../core/services/tag.service';
import { TagComponent } from '../../../../shared/components/tags/tag/tag.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TagComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.getTopTags().subscribe((tags) => (this.tags = tags));
  }
}
