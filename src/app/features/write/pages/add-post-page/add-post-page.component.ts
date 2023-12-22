import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostComponent } from '../../../../shared/components/posts/post/post.component';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/components/utils/overlay/overlay.component';
import { PostAndAuthor } from '../../../../core/models/post';
import { PostDataService } from '../../../../core/services/post-data.service';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { PostService } from '../../../../core/services/post.service';
import { switchMap } from 'rxjs';
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

  publish() {
    const { title, description, coverImageFile, content } =
      this.pds.getCurrentPostData();
    if (coverImageFile) {
      const formData = new FormData();
      formData.append('img', coverImageFile);
      this.postService
        .uploadImage(formData)
        .pipe(
          switchMap((coveImage) =>
            this.postService.addPost({
              title,
              description,
              coverImage: '/api/img/v1/img/' + coveImage.img,
              content,
              isPublish: true,
              tags: [],
            })
          )
        )
        .subscribe({
          next: (r) => {
            this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
            this.pds.clearPostData();
          },
        });
    } else {
      this.postService
        .addPost({
          title,
          description,
          content,
          tags: [],
          isPublish: true,
        })
        .subscribe({
          next: (r) => {
            this.router.navigate(['/', 'post', r.data], { replaceUrl: true });
            this.pds.clearPostData();
          },
        });
    }
  }
}
