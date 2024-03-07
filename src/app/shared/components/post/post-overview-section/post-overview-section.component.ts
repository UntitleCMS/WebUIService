import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PostOverviewComponent } from '../post-overview/post-overview.component';
import { PostOverviewAndAuthor } from '../../../../core/models/post';
import { CommonModule } from '@angular/common';
import { LazyPostService } from '../../../../core/services/lazy-post.service';

@Component({
  selector: 'PostOverviewSection',
  standalone: true,
  imports: [CommonModule, PostOverviewComponent],
  templateUrl: './post-overview-section.component.html',
  styleUrl: './post-overview-section.component.scss',
})
export class PostOverviewSectionComponent implements OnInit {
  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  @Input({ required: true }) postKey: string = 'all';

  private lazyPostService = inject(LazyPostService);

  postOverviewAndAuthors: WritableSignal<PostOverviewAndAuthor[]> | undefined;

  readyStatus = true;
  endLoad = false;

  ngOnInit(): void {
    this.postOverviewAndAuthors = this.lazyPostService.currentPosts
    this.loadMore();
  }

  postTrackBy(index: number, post: PostOverviewAndAuthor) {
    return post.post.id;
  }

  deleteFromList(post: PostOverviewAndAuthor) {
    this.postOverviewAndAuthors?.set(
      this.postOverviewAndAuthors().filter((p) => post.post.id !== p.post.id)
    );
  }

  @HostListener('window:scroll', ['$event'])
  scrollEvent() {
    if (
      window.scrollY + window.innerHeight >
        this.postgroup.nativeElement.offsetHeight &&
      this.readyStatus &&
      !this.endLoad &&
      this.postOverviewAndAuthors &&
      this.postOverviewAndAuthors().length
    ) {
      this.readyStatus = false;
      this.loadPostOnScroll();
    }
  }

  loadPostOnScroll() {
    setTimeout(() => this.loadMore(), 1000);
  }

  loadMore() {
    this.lazyPostService.loadPostToKey(this.postKey, {
      completeCallback: () => {
        this.readyStatus = true;
      },
      zeroLengthHandler: () => {
        this.endLoad = true;
      },
    });
  }
}
