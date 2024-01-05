import { Injectable } from '@angular/core';
import {
  type GetPostsOptions,
  PostRepositoryService,
} from '../repositories/post-repository.service';
import { ImageRepositoryService } from '../repositories/image-repository.service';
import { filter, map, switchMap } from 'rxjs';
import {
  Post,
  PostAddRequest,
  PostAndAuthor,
  PostPreview,
  PostPreviewAndAuthor,
  PostUpdateRequest,
} from '../models/post';
import { UserInformationService } from './user-information.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private postRepo: PostRepositoryService,
    private imageRepo: ImageRepositoryService,
    private userInformationService: UserInformationService
  ) {}

  getAllPosts({
    size,
    pivot,
    author,
    tags,
    searchText,
    bookmark,
  }: GetPostsOptions) {
    return this.postRepo
      .getPosts({ size, pivot, author, tags, searchText, bookmark })
      .pipe(
        switchMap((response) => {
          const postPreviews = response.data?.collections || [];
          const authorIds = postPreviews.map(
            (postPreview) => postPreview.authorId
          );
          return this.mapPostPreviewsAndAuthors(postPreviews, authorIds);
        })
      );
  }

  mapPostPreviewsAndAuthors(postPreviews: PostPreview[], authorIds: string[]) {
    return this.userInformationService.getDisplayName(authorIds).pipe(
      map((authors) =>
        postPreviews.map<PostPreviewAndAuthor>((postPreview) => ({
          postPreview: postPreview,
          author: authors.find(
            (author) => author.userId === postPreview.authorId
          )!,
        }))
      )
    );
  }

  getSinglePostById(id: string) {
    return this.postRepo.getPostById(id).pipe(
      filter((response) => response.isSuccess),
      switchMap((response) => {
        const post = response.data!;
        const authorId = post.authorId;
        return this.mapPostAndAuthor(post, authorId);
      })
    );
  }

  mapPostAndAuthor(post: Post, authorId: string) {
    return this.userInformationService.getDisplayName([authorId]).pipe(
      map(
        (author) =>
          ({
            post: post,
            author: author[0],
          } as PostAndAuthor)
      )
    );
  }

  addPost(post: PostAddRequest) {
    return this.postRepo.addPost(post);
  }

  deletePost(id: string) {
    return this.postRepo.deletePost(id);
  }

  updatePost(id: string, post: PostUpdateRequest) {
    return this.postRepo.updatePost(id, post);
  }

  uploadImage(formData: FormData) {
    return this.imageRepo.uploadImage(formData);
  }

  likePost(id: string) {
    return this.postRepo.likePost(id);
  }

  unlikePost(id: string) {
    return this.postRepo.unlikePost(id);
  }

  savePost(id: string) {
    return this.postRepo.savePost(id);
  }

  unsavePost(id: string) {
    return this.postRepo.unsavePost(id);
  }

  getTopPosts() {
    return this.postRepo.getTopLovePosts(20);
  }

  getDraftPosts({ size, pivot }: GetPostsOptions) {
    return this.postRepo.getDraftPosts({ size, pivot }).pipe(
      switchMap((response) => {
        const postPreviews = response.data?.collections || [];
        const authorIds = postPreviews.map(
          (postPreview) => postPreview.authorId
        );
        return this.mapPostPreviewsAndAuthors(postPreviews, authorIds);
      })
    );
  }
}
