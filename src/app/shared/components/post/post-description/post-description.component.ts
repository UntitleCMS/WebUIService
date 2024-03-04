import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'PostDescription',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
})
export class PostDescriptionComponent {
  @Input() description = '';
  @Input() isEditable = false;

  maxLength = 200;

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
