import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent {

  buttonColor = "#1976d2";

  currentFilter = 'All';

  tasks = [
    {
      title: 'Learn Angular',
      status: 'Completed'
    },
    {
      title: 'Create Dashboard',
      status: 'Pending'
    },
    {
      title: 'Build Login Page',
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