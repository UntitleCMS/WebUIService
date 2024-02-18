import { Injectable } from '@angular/core';
import { PostDataService } from './post-data.service';
import { PostService } from './post.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostManipulateService {
  constructor(private pds: PostDataService, private postService: PostService) {}

  update(postId: string, type: 'publish' | 'draft' = 'publish') {
    const { title, description, coverImageFile, coverImageSrc, content, tags } =
      this.pds.getCurrentPostData();

    if (coverImageFile) {
      const formData = new FormData();
      formData.append('img', coverImageFile);
      return this.postService.uploadImage(formData).pipe(
        switchMap((coveImage) =>
          this.postService.updatePost(postId, {
            title,
            description,
            coverImage: '/api/img/v1/img/' + coveImage.img,
            content,
            isPublish: type === 'publish',
            tags,
          })
        )
      );
    } else {
      return this.postService.updatePost(postId, {
        title,
        description,
        content,
        tags: tags,
        coverImage: coverImageSrc,
        isPublish: type === 'publish',
      });
    }
  }

  add(type: 'publish' | 'draft' = 'publish') {
    const { title, description, coverImageFile, content, tags } =
      this.pds.getCurrentPostData();

    if (coverImageFile) {
      const formData = new FormData();
      formData.append('img', coverImageFile);
      return this.postService.uploadImage(formData).pipe(
        switchMap((coverImage) =>
          this.postService.addPost({
            title,
            description,
            coverImage: '/api/img/v1/img/' + coverImage.img,
            content,
            tags,
            isPublish: type === 'publish',
          })
        )
      );
    } else {
      return this.postService.addPost({
        title,
        description,
        content,
        tags,
        coverImage: undefined,
        isPublish: type === 'publish',
      });
    }
  }
}
