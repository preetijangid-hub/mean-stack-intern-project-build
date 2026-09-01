import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../models/task.model';

const STATUS_LABELS: Record<TaskStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

/** Maps a TaskStatus value to its human-readable label (e.g. "In Progress"). */
@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: TaskStatus | null | undefined): string {
    if (!value) {
      return 'Not Started';
    }
    return STATUS_LABELS[value] ?? 'Not Started';
  }
}
