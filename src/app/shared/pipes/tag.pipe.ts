import { Pipe, PipeTransform, inject } from '@angular/core';
import { TagService } from '../../core/services/tag.service';
import { Tag } from '../../core/models/tag';

@Pipe({
  name: 'tag',
  standalone: true,
})
export class TagPipe implements PipeTransform {
  private tagService = inject(TagService);

  transform(value: string[]): Tag[] {
    return this.tagService.mapAllTags(value);
  }
}
