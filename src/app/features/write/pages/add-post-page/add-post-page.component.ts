import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/posts/post/post.component';
import { CommonModule, Location } from '@angular/common';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { PostDataService } from '../../../../core/services/post-data.service';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Router } from '@angular/router';
import { PostManipulateService } from '../../../../core/services/post-manipulate.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-add-post-page',
  standalone: true,
  imports: [CommonModule, PostComponent, OverlayComponent],
  templateUrl: './add-post-page.component.html',
  styleUrl: './add-post-page.component.scss',
})
export class AddPostPageComponent implements OnInit, OnDestroy {
  post!: PostAndAuthor;
  isConfirmPublishPanelOpen = false;
  isConfirmDraftPanelOpen = false;

  isPostAdded = false;

  constructor(
    private router: Router,
    private pds: PostDataService,
    private auth: AuthorityService,
    private userInformationService: UserInformationService,
    private location: Location,
    private postManipulate: PostManipulateService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userInformationService
      .getDisplayName([this.auth.user_id!])
      .subscribe((name) => {
        this.post = {
          post: {
            content: '',
            title: '',
            description: '',
            tags: [],
            likeCount: 0,
            isPublished: false,
            createdTime: new Date(),
            lastUpdatedTime: new Date(),
            id: '',
            authorId: '',
          },
          author: {
            userId: this.auth.user_id!,
            displayName: name[0].displayName,
          },
        };
      });
  }

  ngOnDestroy(): void {}

  publish() {
    this.postManipulate.add().subscribe({
      next: (r) => {
        this.isPostAdded = true;
        this.toastService.push({
          title: 'เผยแพร่โพสต์สำเร็จ',
          type: 'success',
          icon: 'done',
        });
        this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
        this.pds.clearPostData();
      },
    });
  }

  draft() {
    this.postManipulate.add('draft').subscribe({
      next: (r) => {
        this.isPostAdded = true;
        this.toastService.push({
          title: 'บันทึกเป็นฉบับร่างแล้ว',
          type: 'success',
          icon: 'done',
        });
        this.router.navigate(['/', 'my-posts'], { replaceUrl: true });
        this.pds.clearPostData();
      },
    });
  }

  canDeactivate() {
    if (this.isPostAdded) return true;
    if (confirm('ข้อมูลจะไม่ถูกบันทึก แน่ใจที่จะออกหรือไม่?')) {
      return true;
    }
    return false;
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

  cancelAddAndGoBack() {
    this.location.back();
  }
}
