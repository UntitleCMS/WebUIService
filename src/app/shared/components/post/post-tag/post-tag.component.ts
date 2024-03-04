import { Component, Input, OnInit, inject } from '@angular/core';
import { RemovableTagComponent } from '../../tag/removable-tag/removable-tag.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickInsideDirective } from '../../../directives/click-inside.directive';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { Tag } from '../../../../core/models/tag';
import { TagService } from '../../../../core/services/tag.service';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'PostTag',
  standalone: true,
  imports: [
    CommonModule,
    RemovableTagComponent,
    FormsModule,
    ClickInsideDirective,
    ClickOutsideDirective,
  ],
  templateUrl: './post-tag.component.html',
  styleUrl: './post-tag.component.scss',
})
export class PostTagComponent implements OnInit {
  @Input() existingTags: string[] = [];

  tagService = inject(TagService);
  pds = inject(PostDataService);

  isTagSearchPanelOpen = false;

  availableTags = [...this.tagService.vtags];
  filterAvailableTags = [...this.tagService.vtags];

  usingTags: Tag[] = [];
  tagLimit = 5;

  searchText = '';
  maxTextLength = 24;

  ngOnInit(): void {
    this.usingTags = this.tagService.mapAllTags(this.existingTags);
    this.pds.tags.set(this.existingTags);
  }

  openTagSearchPanel() {
    this.isTagSearchPanelOpen = true;
  }

  closeTagSearchPanel() {
    this.isTagSearchPanelOpen = false;
  }

  addTagToUsingTags(addingTag: Tag) {
    if (this.usingTags.length >= 5) return;
    if (this.usingTags.find((tag) => tag.name === addingTag.name)) return;
    this.usingTags.push(addingTag);
    this.pds.tags.set(this.usingTags.map((tag) => tag.name));
  }

  removeTagFromUsingTags(removingTag: Tag) {
    this.usingTags = this.usingTags.filter(
      (tag) => tag.name !== removingTag.name
    );
    this.pds.tags.set(this.usingTags.map((tag) => tag.name));
  }

  searchTag(e: Event) {
    this.searchText = this.searchText.trim().replace(/\s+/g, '');
    (e.target as HTMLInputElement).value = this.searchText;
    if (this.searchText.length > this.maxTextLength) {
      this.searchText = this.searchText.slice(0, this.maxTextLength);
      (e.target as HTMLInputElement).value = this.searchText;
      return;
    }

    this.filterTag();
  }

  filterTag() {
    this.filterAvailableTags = this.availableTags.filter((tag) =>
      tag.name.includes(this.searchText)
    );
    if (
      this.searchText.length &&
      !this.filterAvailableTags.find((tag) => tag.name === this.searchText)
    ) {
      this.filterAvailableTags.push(
        this.tagService.mapUnknownTag(this.searchText)
      );
    }
  }
}
