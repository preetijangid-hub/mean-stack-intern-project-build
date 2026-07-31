import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, TaskFormComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent {

  constructor(public taskService: TaskService) {}

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  editTask(task: Task) {

    const title = prompt('Edit Task', task.title);

    if (title && title.trim()) {
      this.taskService.editTask(task.id, title);
    }

  }

}