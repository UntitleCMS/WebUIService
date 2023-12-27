import { Component, Input } from '@angular/core';
import { Tag } from '../../../../core/models/tag';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input({ required: true }) tag!: Tag;
  @Input() linkable = true;

  bgColor = '';
  textColor = '';

  ngOnInit(): void {
    this.bgColor = this.tag.color.startsWith('#')
      ? this.tag.color
      : '#' + this.tag.color;
    this.textColor = this.getContrastingColor();
  }

  getContrastingColor(): string {
    const hex = this.tag.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? '#000000' : '#FFFFFF';
  }
}
