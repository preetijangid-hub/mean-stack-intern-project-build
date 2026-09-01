import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Adds an interactive highlight (soft indigo glow) to a card element
 * while the pointer hovers over it.
 * Usage: <article appHighlight>...</article>
 */
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostListener('mouseenter')
  protected onEnter(): void {
    const element = this.elementRef.nativeElement;
    element.style.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.18)';
    element.style.borderColor = '#c7d2fe';
  }

  @HostListener('mouseleave')
  protected onLeave(): void {
    const element = this.elementRef.nativeElement;
    element.style.boxShadow = '';
    element.style.borderColor = '';
  }
}
