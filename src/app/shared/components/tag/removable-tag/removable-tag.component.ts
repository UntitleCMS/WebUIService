import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../../core/models/tag';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'RemovableTag',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './removable-tag.component.html',
  styleUrl: './removable-tag.component.scss'
})
export class RemovableTagComponent {
  @Input({ required: true }) tag!: Tag;
  @Output() remove = new EventEmitter<Tag>();

  removeTag() {
    this.remove.emit(this.tag);
  }
}
