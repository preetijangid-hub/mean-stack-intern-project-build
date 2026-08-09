import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCard } from './components/task-card/task-card';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TaskCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Assignment',
      description: 'Create Custom Pipe and Directive',
      dueDate: '2026-08-10',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Prepare Presentation',
      description: 'Make PPT for Internship',
      dueDate: '2026-08-12',
      status: 'In Progress'
    }
  ];

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending'
  };

  addTask() {

    if (!this.newTask.title.trim()) {
      return;
    }

    this.tasks.push({
      ...this.newTask,
      id: Date.now()
    });

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      dueDate: '',
      status: 'Pending'
    };

  }

}