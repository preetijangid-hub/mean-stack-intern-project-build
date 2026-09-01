import { Injectable, computed, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

/** A single toast notification rendered by the ToastComponent. */
export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

const DEFAULT_DURATION_MS = 4000;
const ERROR_DURATION_MS = 6000;

/**
 * Lightweight toast state service backed by Angular signals.
 * The ToastComponent consumes `toasts()` to render notifications.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  private readonly toastsSignal = signal<ToastMessage[]>([]);

  /** Currently visible toasts (newest last). */
  readonly toasts = computed(() => this.toastsSignal());

  /** True when at least one toast is visible. */
  readonly hasToasts = computed(() => this.toastsSignal().length > 0);

  success(message: string): void {
    this.show('success', message, DEFAULT_DURATION_MS);
  }

  error(message: string): void {
    this.show('error', message, ERROR_DURATION_MS);
  }

  info(message: string): void {
    this.show('info', message, DEFAULT_DURATION_MS);
  }

  /** Removes a single toast by id (also used by the auto-dismiss timer). */
  dismiss(id: number): void {
    this.toastsSignal.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  /** Removes every visible toast. */
  clear(): void {
    this.toastsSignal.set([]);
  }

  // ------------------------------------------------------------------

  private show(type: ToastType, message: string, durationMs: number): void {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }
    const toast: ToastMessage = { id: this.nextId++, type, message: trimmed };
    this.toastsSignal.update((toasts) => [...toasts, toast]);
    setTimeout(() => this.dismiss(toast.id), durationMs);
  }
}

