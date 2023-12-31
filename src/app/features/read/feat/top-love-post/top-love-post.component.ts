import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { KeyPair } from '../../../../core/models/response';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-love-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-love-post.component.html',
  styleUrl: './top-love-post.component.scss',
})
export class TopLovePostComponent implements OnInit {
  topPosts: KeyPair[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getTopPosts()
      .subscribe((posts) => (this.topPosts = posts));
  }
}
