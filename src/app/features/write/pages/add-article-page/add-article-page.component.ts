import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../../../../shared/components/post/post/post.component';
import { PostDataService } from '../../../../core/services/post-data.service';
import { PostAddRequest, PostAndAuthor } from '../../../../core/models/post';
import { UserService } from '../../../../core/auth/user.service';
import { PostService } from '../../../../core/services/post.service';
import { switchMap, tap } from 'rxjs';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'AddArticlePage',
  standalone: true,
  imports: [CommonModule, FormsModule, PostComponent, OverlayComponent],
  templateUrl: './add-article-page.component.html',
  styleUrl: './add-article-page.component.scss',
})
export class AddArticlePageComponent implements OnInit {
  public pds = inject(PostDataService);
  private user = inject(UserService);
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
    this.postAndAuthor = {
      post: {
        id: '',
        title: '',
        description: '',
        tags: [],
        content: '',
        authorId: '',
        createdTime: new Date(),
        lastUpdatedTime: new Date(),
        isPublished: false,
        likeCount: 0,
      },
      author: this.user.currentUser()!,
    };
  }

  add(type: 'publish' | 'draft') {
    this.pds.logging();
    let postRequest: PostAddRequest = {
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
          switchMap(() => this.postService.addPost(postRequest))
        )
        .subscribe(() => {
          this.isPublished = true;
          this.lazyPost.disposeMap();
          this.toastService.push({
            title: 'เพิ่มโพสต์สำเร็จ',
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
      this.postService.addPost(postRequest).subscribe(() => {
        this.isPublished = true;
        this.lazyPost.disposeMap();
        this.toastService.push({
          title: 'เพิ่มโพสต์สำเร็จ',
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
