import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {

  totalTasks = 10;
  completedTasks = 6;
  pendingTasks = 4;

  get progress(): number {
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

}