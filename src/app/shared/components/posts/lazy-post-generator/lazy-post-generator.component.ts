import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import { CommonModule } from '@angular/common';
import { LazyPostService } from '../../../../core/services/lazy-post.service';

@Component({
  selector: 'app-lazy-post-generator',
  standalone: true,
  imports: [CommonModule, PostPreviewComponent],
  templateUrl: './lazy-post-generator.component.html',
  styleUrl: './lazy-post-generator.component.scss',
})
export class LazyPostGeneratorComponent implements OnInit, OnDestroy {
  @Input({ required: true }) postType: 'all' | 'following' | 'author' = 'all';
  @Input() authorId?: string;

  ppas: PostPreviewAndAuthor[] = [];

  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  readyStatus = true;
  endLoad = false;

  constructor(private lazyPostService: LazyPostService) {}

  ngOnInit(): void {
    this.selectMethod();
  }

  ngOnDestroy(): void {
    // console.log('destroyed');
  }

  selectMethod() {
    if (this.postType === 'all') {
      this.lazyPostService
        .getLazyMap(this.postType)
        .posts$.subscribe((ppas) => {
          this.ppas = ppas;
        });
      this.loadMore();
    } else if (this.postType === 'following') {
      this.ppas = [];
    } else if (this.postType === 'author' && this.authorId) {
      this.lazyPostService
        .getLazyMap(this.authorId)
        .posts$.subscribe((ppas) => {
          this.ppas = ppas;
        });
      this.loadMore();
    } else {
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollEvent() {
    if (
      window.scrollY + window.innerHeight >
        this.postgroup.nativeElement.offsetHeight &&
      this.readyStatus &&
      !this.endLoad &&
      this.ppas.length
    ) {
      this.readyStatus = false;
      this.loadPostOnScroll();
    }
  }

  loadPostOnScroll() {
    setTimeout(() => this.loadMore(), 1000);
  }

  loadMore() {
    this.lazyPostService.loadMoreTo(
      !!this.authorId ? this.authorId : this.postType,
      {
        completeCallback: () => {
          this.readyStatus = true;
        },
        zeroLengthHandler: () => {
          this.endLoad = true;
        },
        author: this.postType === 'author' ? this.authorId : undefined,
      }
    );
  }
}
