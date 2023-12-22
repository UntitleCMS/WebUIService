import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'app-post-title',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-title.component.html',
  styleUrl: './post-title.component.scss',
})
export class PostTitleComponent implements OnInit {
  @Input() title = '';

  @Input() isEditable = false;

  constructor(
    private pds: PostDataService,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const textarea =
          this.elementRef.nativeElement.querySelector('textarea');
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });
    this.pds.title = this.title;
  }
}
