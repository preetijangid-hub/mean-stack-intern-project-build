import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  newTask = '';

  tasks: Task[] = [
    {
      title: 'Learn Angular Material',
      completed: true
    },
    {
      title: 'Build dashboard',
      completed: false
    },
    {
      title: 'Practice Angular routing',
      completed: false
    },
    {
      title: 'Review Angular components',
      completed: true
    }
  ];

  addTask(): void {
    const title = this.newTask.trim();

    if (!title) {
      return;
    }

    this.tasks.push({
      title,
      completed: false
    });

    this.newTask = '';
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  editTask(index: number): void {
    const updatedTitle = prompt('Enter new task name:', this.tasks[index].title);

    if (updatedTitle && updatedTitle.trim()) {
      this.tasks[index].title = updatedTitle.trim();
    }
  }
}