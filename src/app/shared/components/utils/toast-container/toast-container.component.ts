import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { ToastData, ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(100px)',
        }),
        animate(
          150,
          style({
            opacity: 1,
            transform: 'none',
          })
        ),
      ]),
      transition(':leave', [
        animate(
          150,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
  ],
})
export class ToastContainerComponent implements OnInit {
  toasts: ToastData[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((data) => {
      this.toasts = data;
    });
  }
}
