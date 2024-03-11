import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastData } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @Input({ required: true }) toastData!: ToastData;

  ngOnInit() {
    console.log(this.toastData);
    
  }
}
