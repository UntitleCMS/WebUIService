import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/posts/post/post.component';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { PostDataService } from '../../../../core/services/post-data.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-post-page',
  standalone: true,
  imports: [CommonModule, PostComponent, OverlayComponent],
  templateUrl: './edit-post-page.component.html',
  styleUrl: './edit-post-page.component.scss',
})
export class EditPostPageComponent implements OnInit {
  post!: PostAndAuthor;

  isConfirmPublishPanelOpen = false;
  isPublished = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private pds: PostDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          const postId = params.get('postId');
          if (!postId) {
            throw new Error('Invalid Post ID');
          }
          return postId;
        }),
        switchMap((postId) => this.postService.getSinglePostById(postId))
      )
      .subscribe((post) => (this.post = post));
  }

  openConfirmPublishPanel() {
    this.isConfirmPublishPanelOpen = true;
  }

  closeConfirmPublishPanel() {
    this.isConfirmPublishPanelOpen = false;
  }

  publish() {
    const { title, description, coverImageFile, content, tags } =
      this.pds.getCurrentPostData();
    if (coverImageFile) {
      const formData = new FormData();
      formData.append('img', coverImageFile);
      this.postService
        .uploadImage(formData)
        .pipe(
          switchMap((coveImage) =>
            this.postService.updatePost(this.post.post.id, {
              title,
              description,
              coverImage: '/api/img/v1/img/' + coveImage.img,
              content,
              isPublish: true,
              tags,
            })
          )
        )
        .subscribe({
          next: (r) => {
            this.isPublished = true;
            this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
            this.pds.clearPostData();
          },
        });
    } else {
      this.postService
        .updatePost(this.post.post.id, {
          title,
          description,
          content,
          coverImage: this.post.post.coverImage,
          tags: tags,
          isPublish: true,
        })
        .subscribe({
          next: (r) => {
            this.isPublished = true;
            this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
            this.pds.clearPostData();
          },
        });
    }
  }

  canDeactivate() {
    if (this.isPublished) return true;
    if (confirm('ข้อมูลจะไม่ถูกบันทึก แน่ใจที่จะออกหรือไม่?')) {
      return true;
    }
    return false;
  }
}
