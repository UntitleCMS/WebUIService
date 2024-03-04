import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'PostTitle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-title.component.html',
  styleUrl: './post-title.component.scss',
})
export class PostTitleComponent {
  @Input() title = '';
  @Input() isEditable = false;

  maxLength = 100;

  constructor(
    private pds: PostDataService,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight(e?: Event) {
    const el = e?.target as HTMLInputElement;

    if (el && el.value.length > this.maxLength) {
      el.value = this.title.slice(0, this.maxLength);
      this.title = el.value;
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const textarea =
          this.elementRef.nativeElement.querySelector('textarea');
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });
    this.pds.title.set(this.title);
  }
}
