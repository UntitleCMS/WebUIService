import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { Tag } from '../../../../core/models/tag';

@Component({
  selector: 'app-removable-tag',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './removable-tag.component.html',
  styleUrl: './removable-tag.component.scss',
})
export class RemovableTagComponent {
  @Input({ required: true }) tag!: Tag;
  @Output() remove = new EventEmitter<Tag>();

  removeTag() {
    this.remove.emit(this.tag);
  }
}
