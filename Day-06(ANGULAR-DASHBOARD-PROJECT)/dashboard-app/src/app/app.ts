import { Component, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';

import { HeaderComponent } from './components/header/header';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    DashboardCardComponent,
    DatePipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  today = new Date();

  totalTasks = signal(12);
  completed = signal(7);
  pending = signal(5);
  inProgress = signal(3);

  progress = computed(() =>
    Math.round((this.completed() / this.totalTasks()) * 100)
  );

  greeting() {

    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 17) return 'Good Afternoon 🌤️';

    return 'Good Evening 🌙';

  }

  increase() {

    this.totalTasks.update(v => v + 1);
    this.pending.update(v => v + 1);

  }

  decrease() {

    if (this.totalTasks() > 1) {

      this.totalTasks.update(v => v - 1);

      if (this.pending() > 0) {

        this.pending.update(v => v - 1);

      }

    }

  }

}