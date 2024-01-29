import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PostPreviewAndAuthor } from '../../../../core/models/post';
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import { CommonModule } from '@angular/common';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { BlockGroupSkeletonComponent } from '../../../skeletons/block-group-skeleton/block-group-skeleton.component';

@Component({
  selector: 'app-lazy-post-generator',
  standalone: true,
  imports: [CommonModule, PostPreviewComponent, BlockGroupSkeletonComponent],
  templateUrl: './lazy-post-generator.component.html',
  styleUrl: './lazy-post-generator.component.scss',
})
export class LazyPostGeneratorComponent implements OnChanges {
  @Input({ required: true }) postType:
    | 'all'
    | 'following'
    | 'author'
    | 'tag'
    | 'bookmark' = 'all';
  @Input() keyId?: string;

  ppas: PostPreviewAndAuthor[] = [];

  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  readyStatus = true;
  endLoad = false;

  constructor(private lazyPostService: LazyPostService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postType'] || changes['keyId']) {
      this.selectMethod();
    }
  }

  selectMethod() {
    const postTypeActions = {
      all: () => this.lazyPostService.getLazyMap('all', ''),
      following: () => this.lazyPostService.getLazyMap('following', ''),
      author: () =>
        this.keyId
          ? this.lazyPostService.getLazyMap('author', this.keyId)
          : null,
      tag: () =>
        this.keyId ? this.lazyPostService.getLazyMap('tag', this.keyId) : null,
      bookmark: () => this.lazyPostService.getLazyMap('bookmark', ''),
    };

    const action = postTypeActions[this.postType];

    if (action) {
      action()?.posts$.subscribe((ppas) => {
        this.ppas = ppas;
      });
      this.loadMore();
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
    this.lazyPostService.loadMoreTo(this.postType, this.keyId || '', {
      completeCallback: () => {
        this.readyStatus = true;
      },
      zeroLengthHandler: () => {
        this.endLoad = true;
      },
    });
  }
}
