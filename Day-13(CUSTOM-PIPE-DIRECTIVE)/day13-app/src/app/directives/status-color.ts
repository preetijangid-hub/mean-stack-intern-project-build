import {
  Directive,
  ElementRef,
  Input,
  OnChanges
} from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColor implements OnChanges {

  @Input('appStatusColor') status = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {

    const card = this.el.nativeElement;

    switch (this.status) {

      case 'Completed':
        card.style.borderLeft = '8px solid #28a745';
        break;

      case 'In Progress':
        card.style.borderLeft = '8px solid orange';
        break;

      default:
        card.style.borderLeft = '8px solid red';
        break;

    }

  }

}