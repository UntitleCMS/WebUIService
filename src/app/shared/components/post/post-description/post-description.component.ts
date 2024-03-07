import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDataService } from '../../../../core/services/post-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'PostDescription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
})
export class PostDescriptionComponent implements OnInit {
  @Input() description = '';
  @Input() isEditable = false;

  maxLength = 200;

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
      el.value = this.description.slice(0, this.maxLength);
      this.description = el.value;
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
    this.pds.description.set(this.description);
  }
}
