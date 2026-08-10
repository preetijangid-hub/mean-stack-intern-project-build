import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  stats = [
    {
      title: 'Total Tasks',
      value: 12,
      icon: 'assignment',
      description: 'All assigned tasks'
    },
    {
      title: 'Completed',
      value: 7,
      icon: 'check_circle',
      description: 'Successfully completed'
    },
    {
      title: 'In Progress',
      value: 5,
      icon: 'schedule',
      description: 'Currently active'
    },
    {
      title: 'Progress',
      value: '58%',
      icon: 'trending_up',
      description: 'Overall completion'
    }
  ];
}