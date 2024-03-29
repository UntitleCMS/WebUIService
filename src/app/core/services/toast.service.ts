import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastTypes = 'error' | 'success' | 'warn';

export type ToastIcon = 'done' | 'info' | 'warning';

export interface ToastDataBase {
  title: string;
  content?: string;
  type: ToastTypes;
  icon: ToastIcon;
  life: number;
  click?: {
    label: string;
    action: () => void;
  };
}

export interface ToastData extends ToastDataBase {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts: BehaviorSubject<ToastData[]>;

  private readonly TOAST_LIFETIME = 6000;

  get toasts$() {
    return this._toasts.asObservable();
  }

  constructor() {
    this._toasts = new BehaviorSubject<ToastData[]>([]);
  }

  push({ title, content, type, icon, life, click }: ToastDataBase) {
    const toastData = this.attachTimeToToast({
      title,
      content,
      type,
      icon,
      life,
      click,
    });
    this._toasts.next([...this._toasts.value, toastData]);

    setTimeout(() => {
      this.removeToast(toastData.id);
    }, life);
  }

  private attachTimeToToast(base: ToastDataBase): ToastData {
    const id = Date.now() + Math.floor(Math.random() * 10);
    return { id, ...base };
  }

  private removeToast(id: number): void {
    if (!id) return;
    const currentToasts = this._toasts.value;
    const updatedToasts = currentToasts.filter((toast) => toast.id !== id);
    this._toasts.next(updatedToasts);
  }
}
