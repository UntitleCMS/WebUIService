import { Component, OnInit } from '@angular/core';
import { PostPreviewComponent } from '../../../../shared/components/posts/post-preview/post-preview.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { LazyPostGeneratorComponent } from '../../../../shared/components/posts/lazy-post-generator/lazy-post-generator.component';
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
  posts: PostPreviewAndAuthor[] = [];

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.postService
      .getAllPosts({ size: 20, pivot: null })
      .subscribe((ppas) => (this.posts = ppas));
  }
}
