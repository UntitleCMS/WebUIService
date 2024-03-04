import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../../../../core/models/tag';
import { ContrastPipe } from '../../../pipes/contrast.pipe';

@Component({
  selector: 'Tag',
  standalone: true,
  imports: [RouterLink, ContrastPipe],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input({ required: true }) tag!: Tag;
  @Input() linkable = true;
}
