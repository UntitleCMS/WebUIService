import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../core/services/post.service';
import { KeyPair } from '../../../core/models/response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'TopLikePost',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-like-post.component.html',
  styleUrl: './top-like-post.component.scss',
})
export class TopLikePostComponent implements OnInit {
  postService = inject(PostService);
  posts: KeyPair[] = [];

  ngOnInit(): void {
    this.postService.getTopPosts().pipe().subscribe((p) => this.posts = p);
  }
}
