import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  el: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('document:click', ['$event.target'])
  public onOutClick(target: HTMLElement) {
    if (!this.el.dataset['toggle']) return;

    let clickedInside = this.el.contains(target);
    if (!clickedInside && this.el.dataset['toggle'] === 'true') {
      this.el.dataset['toggle'] = 'false';
      this.clickOutside.emit();
    }
  }
}
