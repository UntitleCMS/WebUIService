import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDataService } from '../../../../core/services/post-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'PostTitle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-title.component.html',
  styleUrl: './post-title.component.scss',
})
export class PostTitleComponent implements OnInit {
  @Input() title = '';
  @Input() isEditable = false;

  maxLength = 100;

  constructor(
    private pds: PostDataService,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    if (this.isEditable) {
      this.adjustTextareaHeight();
    }
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
