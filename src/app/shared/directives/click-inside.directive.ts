import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickInside]',
  standalone: true,
})
export class ClickInsideDirective {
  @Output() clickInside = new EventEmitter<void>();

  el: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('click', ['$event.target'])
  public onInClick() {
    if (!this.el.dataset['toggle']) return;

    if (this.el.dataset['toggle'] === 'false') {
      this.el.dataset['toggle'] = 'true';
      this.clickInside.emit();
    }
  }
}
