import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/posts/post/post.component';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { PostAddRequest, PostAndAuthor } from '../../../../core/models/post';
import { PostDataService } from '../../../../core/services/post-data.service';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { PostService } from '../../../../core/services/post.service';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

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
    private postService: PostService,
    private pds: PostDataService,
    private auth: AuthorityService,
    private userInformationService: UserInformationService
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

  publish() {
    const { title, description, coverImageFile, content, tags } =
      this.pds.getCurrentPostData();

    if (coverImageFile) {
      this.uploadCoverImage(coverImageFile).pipe(
        switchMap((coverImage) =>
          this.publishPost({
            title,
            description,
            coverImage: '/api/img/v1/img/' + coverImage.img,
            content,
            tags,
            isPublish: true,
          })
        )
      ).subscribe();
    } else {
      this.publishPost({
        title,
        description,
        content,
        tags,
        isPublish: true,
      }).subscribe();
    }
  }

  draft() {
    console.log('drafting');
    
    const { title, description, coverImageFile, content, tags } =
      this.pds.getCurrentPostData();

    if (coverImageFile) {
      this.uploadCoverImage(coverImageFile).pipe(
        switchMap((coverImage) =>
          this.draftPost({
            title,
            description,
            coverImage: '/api/img/v1/img/' + coverImage.img,
            content,
            tags,
            isPublish: false,
          })
        )
      ).subscribe();
    } else {
      console.log('draf2');
      
      this.draftPost({
        title,
        description,
        content,
        tags,
        isPublish: false,
      }).subscribe();
    }
  }

  canDeactivate() {
    if (this.isPostAdded) return true;
    if (confirm('ข้อมูลจะไม่ถูกบันทึก แน่ใจที่จะออกหรือไม่?')) {
      return true;
    }
    return false;
  }

  uploadCoverImage(coverImageFile: File) {
    const formData = new FormData();
    formData.append('img', coverImageFile);
    return this.postService.uploadImage(formData);
  }

  publishPost(postAdd: PostAddRequest) {
    return this.postService.addPost(postAdd).pipe(
      tap({
        next: (r) => {
          this.isPostAdded = true;
          this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
          this.pds.clearPostData();
        },
      })
    );
  }

  draftPost(postAdd: PostAddRequest) {
    return this.postService.addPost(postAdd).pipe(
      tap({
        next: () => {
          this.isPostAdded = true;
          this.router.navigate(['/', 'my-posts'], { replaceUrl: true });
          this.pds.clearPostData();
        },
      })
    );
  }
}
