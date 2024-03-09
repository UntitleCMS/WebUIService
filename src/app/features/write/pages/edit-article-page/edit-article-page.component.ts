import { Component, OnInit, inject } from '@angular/core';
import { PostDataService } from '../../../../core/services/post-data.service';
import { PostComponent } from '../../../../shared/components/post/post/post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { PostAndAuthor, PostUpdateRequest } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { CommonModule, Location } from '@angular/common';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'EditArticlePage',
  standalone: true,
  imports: [CommonModule, OverlayComponent, PostComponent],
  templateUrl: './edit-article-page.component.html',
  styleUrl: './edit-article-page.component.scss',
})
export class EditArticlePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public pds = inject(PostDataService);
  private postService = inject(PostService);
  private router = inject(Router);
  private lazyPost = inject(LazyPostService);
  private toastService = inject(ToastService);
  private location = inject(Location);

  isConfirmDraftPanelOpen = false;
  isConfirmPublishedPanelOpen = false;

  postAndAuthor!: PostAndAuthor;

  isPublished = false;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramMap) => {
          const postId = paramMap.get('postId');
          if (!postId) {
            throw new Error('Invalid postId');
          }
          return postId;
        }),
        switchMap((postId) => this.postService.getSinglePostById(postId))
      )
      .subscribe((post) => (this.postAndAuthor = post));
  }

  add(type: 'publish' | 'draft') {
    this.pds.logging();
    let postRequest: PostUpdateRequest = {
      title: this.pds.title(),
      description: this.pds.description(),
      tags: this.pds.tags(),
      content: this.pds.content(),
      isPublish: type === 'publish',
    };

    if (this.pds.coverFile()) {
      const formData = new FormData();
      formData.append('img', this.pds.coverFile()!);
      this.postService
        .uploadImage(formData)
        .pipe(
          tap((res) => {
            postRequest.coverImage = '/api/img/v1/img/' + res.img;
          }),
          switchMap(() =>
            this.postService.updatePost(this.postAndAuthor.post.id, postRequest)
          )
        )
        .subscribe(() => {
          this.lazyPost.disposeMap();
          this.isPublished = true;
          this.toastService.push({
            title: 'อัปเดตโพสต์สำเร็จ',
            type: 'success',
            icon: 'done',
            life: 3000,
          });
          this.router.navigate([
            '/my-posts',
            type === 'publish' ? 'published' : 'draft',
          ]);
        });
    } else {
      if (this.postAndAuthor.post.coverImage) {
        postRequest.coverImage = this.postAndAuthor.post.coverImage;
      }
      this.postService
        .updatePost(this.postAndAuthor.post.id, postRequest)
        .subscribe(() => {
          this.isPublished = true;
          this.lazyPost.disposeMap();
          this.toastService.push({
            title: 'อัปเดตโพสต์สำเร็จ',
            type: 'success',
            icon: 'done',
            life: 3000,
          });
          this.router.navigate([
            '/my-posts',
            type === 'publish' ? 'published' : 'draft',
          ]);
        });
    }
  }

  openPublishPanel() {
    this.isConfirmPublishedPanelOpen = true;
  }

  closePublishPanel() {
    this.isConfirmPublishedPanelOpen = false;
  }

  openDraftPanel() {
    this.isConfirmDraftPanelOpen = true;
  }

  closeDraftPanel() {
    this.isConfirmDraftPanelOpen = false;
  }

  back() {
    this.location.back();
  }

  canDeactivate() {
    if (this.isPublished) {
      return true;
    }
    return confirm('คุณกำลังจะออกจากหน้านี้ ข้อมูลที่แก้ไขจะไม่ถูกบันทึก');
  }
}
