import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/posts/post/post.component';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { PostDataService } from '../../../../core/services/post-data.service';
import { map, switchMap } from 'rxjs';
import { PostManipulateService } from '../../../../core/services/post-manipulate.service';

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
  isConfirmDraftPanelOpen = false;

  isPostAdded = false;

  isDraftPost = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private pds: PostDataService,
    private location: Location,
    private postManipulate: PostManipulateService
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
      .subscribe((post) => {
        this.post = post;
        this.isDraftPost = !post.post.isPublished;
      });
  }

  publish() {
    this.postManipulate.update(this.post.post.id).subscribe({
      next: (r) => {
        this.isPostAdded = true;
        this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
        this.pds.clearPostData();
      },
    });
  }

  draft() {
    this.postManipulate.update(this.post.post.id, 'draft').subscribe({
      next: (r) => {
        this.isPostAdded = true;
        this.router.navigate(['/', 'my-posts'], { replaceUrl: true });
        this.pds.clearPostData();
      },
    });
  }

  cancelEditAndGoBack() {
    this.location.back();
  }

  cancelPublishing() {
    this.draft();
  }

  openConfirmPublishPanel() {
    this.isConfirmPublishPanelOpen = true;
  }

  closeConfirmPublishPanel() {
    this.isConfirmPublishPanelOpen = false;
  }

  openConfirmDraftPanel() {
    this.isConfirmDraftPanelOpen = true;
  }

  closeConfirmDraftPanel() {
    this.isConfirmDraftPanelOpen = false;
  }

  canDeactivate() {
    if (this.isPostAdded) return true;
    if (confirm('ข้อมูลจะไม่ถูกบันทึก แน่ใจที่จะออกหรือไม่?')) {
      return true;
    }
    return false;
  }
}
