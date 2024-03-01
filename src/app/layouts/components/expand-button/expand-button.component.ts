import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-expand-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expand-button.component.html',
  styleUrl: './expand-button.component.scss',
})
export class ExpandButtonComponent {
  @Input() isExpanded: boolean = false;
  @Output() expandChange = new EventEmitter();

  toggleExpand(): void {
    this.expandChange.emit();
  }
}
