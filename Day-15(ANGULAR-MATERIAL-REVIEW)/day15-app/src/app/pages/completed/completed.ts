import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './completed.html',
  styleUrl: './completed.css'
})
export class Completed {

  completedTasks = [
    'Angular Material installation',
    'Angular component creation',
    'Angular routing setup',
    'Task management page',
    'Dashboard design'
  ];

}