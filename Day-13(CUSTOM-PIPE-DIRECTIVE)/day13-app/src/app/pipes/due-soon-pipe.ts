import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueSoon',
  standalone: true
})
export class DueSoonPipe implements PipeTransform {

  transform(dueDate: string): string {

    const today = new Date();

    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff =
      Math.ceil(
        (due.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      );

    if (diff < 0) {
      return 'Overdue';
    }

    if (diff === 0) {
      return 'Due Today';
    }

    if (diff <= 3) {
      return `Due in ${diff} day${diff > 1 ? 's' : ''}`;
    }

    return dueDate;
  }

}