import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent {

  currentFilter = 'All';

  tasks = [
    {
      title: 'Learn Angular',
      status: 'Completed'
    },
    {
      title: 'Build Dashboard',
      status: 'Pending'
    },
    {
      title: 'Create Login Page',
      status: 'In Progress'
    }
  ];

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  get filteredTasks() {

    if (this.currentFilter === 'All') {
      return this.tasks;
    }

    return this.tasks.filter(
      task => task.status === this.currentFilter
    );

  }

}