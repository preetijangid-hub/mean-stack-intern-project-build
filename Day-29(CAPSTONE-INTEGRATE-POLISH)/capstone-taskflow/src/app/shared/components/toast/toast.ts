import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../../core/services/toast';

/**
 * Global toast outlet — renders every toast pushed into ToastService.
 * Rendered once from the root application layout (app.html).
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  protected readonly toastService = inject(ToastService);

  protected iconFor(type: ToastType): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '!';
      case 'info':
        return 'i';
      default:
        return '•';
    }
  }
}
