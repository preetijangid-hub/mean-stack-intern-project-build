import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent {

  title = '';

  constructor(private taskService: TaskService) {}

  addTask() {

    if (this.title.trim()) {

      this.taskService.addTask(this.title);

      this.title = '';

    }

  }

}