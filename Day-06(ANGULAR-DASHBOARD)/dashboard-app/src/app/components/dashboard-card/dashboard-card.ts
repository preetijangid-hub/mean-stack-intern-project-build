import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css'
})
export class DashboardCard {

  totalTasks = signal(12);
  pendingTasks = signal(4);
  inProgress = signal(3);
  completedTasks = signal(5);

  addTask() {
    this.totalTasks.update(v => v + 1);
    this.pendingTasks.update(v => v + 1);
  }

  completeTask() {

    if (this.pendingTasks() > 0) {

      this.pendingTasks.update(v => v - 1);

      this.completedTasks.update(v => v + 1);

    }

  }

}