import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'app-post-description',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
})
export class PostDescriptionComponent implements OnInit {
  @Input() description = '';

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
    this.pds.description = this.description;
  }
}
