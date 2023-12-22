import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tags } from '../../../../core/constants/tags';
import { TagService } from '../../../../core/services/tag.service';
import { CommonModule } from '@angular/common';
import { RemovableTagComponent } from '../removable-tag/removable-tag.component';
import { Tag } from '../../../../core/models/tag';
import { ClickInsideDirective } from '../../../directives/click-inside.directive';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

@Component({
  selector: 'app-tag-factory',
  standalone: true,
  imports: [
    CommonModule,
    RemovableTagComponent,
    ClickInsideDirective,
    ClickOutsideDirective,
  ],
  templateUrl: './tag-factory.component.html',
  styleUrl: './tag-factory.component.scss',
})
export class TagFactoryComponent implements OnInit {
  @Input() existingTags: Tag[] = [];
  @Output() tagChange = new EventEmitter<string[]>();

  availableTags = Tags;
  isTagSearchPanelOpen = false;

  usingTags: Tag[] = [];
  tagLimit = 5;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.usingTags = [...this.existingTags];
    // this.tagService
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
    this.tagChange.emit(this.usingTags.map((tag) => tag.name));
  }

  removeTagFromUsingTags(removingTag: Tag) {
    this.usingTags = this.usingTags.filter(
      (tag) => tag.name !== removingTag.name
    );
    this.tagChange.emit(this.usingTags.map((tag) => tag.name));
  }
}
