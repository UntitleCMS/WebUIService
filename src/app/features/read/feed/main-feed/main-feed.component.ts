import { Component, OnInit } from '@angular/core';
import { PostPreviewComponent } from '../../../../shared/components/posts/post-preview/post-preview.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';
import { AuthorityService } from '../../../../core/auth/authority.service';

@Component({
  selector: 'app-main-feed',
  standalone: true,
  imports: [
    CommonModule,
    PostPreviewComponent,
    RouterLink,
    LazyPostGeneratorComponent,
  ],
  templateUrl: './main-feed.component.html',
  styleUrl: './main-feed.component.scss',
})
export class MainFeedComponent implements OnInit {
  isLoggedIn = false;

  title = 'โปรแกรมเมอร์มือหนึ่ง';
  description =
    'เบต้าบล็อกให้บริการในการเขียนบทความในรูปแบบบล็อก โดยอำนวยความสะดวกให้โปรแกรมเมอร์โดยการเพิ่มฟังก์ชันในการเขียนโค้ด และสั่งให้โค้ดทำงาน ขณะนี้ ระบบของเราให้บริการในภาษา C, Python, Java';

  posts: PostPreviewAndAuthor[] = [];

  constructor(
    private postService: PostService,
    private auth: AuthorityService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedin;
    this.postService
      .getAllPosts({ size: 20, pivot: null })
      .subscribe((ppas) => (this.posts = ppas));
  }
}
