import { Injectable, inject } from '@angular/core';
import { Tags } from '../constants/tags';
import { Tag } from '../models/tag';
import { GetTagsOptions, PostRepositoryService } from '../repositories/post-repository.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  vtags: Tag[] = Tags;
  defaultColor = '3f3f46';

  postRepo = inject(PostRepositoryService);

  getTopTags() {
    return this.postRepo
      .getTopTags(20)
      .pipe(map((tags) => tags.map((tag) => this.mapTag(tag.key))));
  }

  mapTag(tagName: string) {
    return (
      this.vtags.find((tag) => tag.name === tagName) ||
      this.mapUnknownTag(tagName)
    );
  }

  mapAllTags(tagNames: string[]) {
    return tagNames.map((tagName) => this.mapTag(tagName));
  }

  getColorFromTagName(tagName: string) {
    return this.mapTag(tagName).color;
  }

  mapUnknownTag(tagName: string): Tag {
    return {
      name: tagName,
      // .split(' ')
      // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // .join(' '),
      color: this.defaultColor,
    };
  }

  getTags({ size, include }: GetTagsOptions) {
    return this.postRepo.getAllTags({ size, include });
  }
}
