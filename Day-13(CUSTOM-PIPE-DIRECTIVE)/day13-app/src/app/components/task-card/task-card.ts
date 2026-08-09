import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task } from '../../models/task';
import { DueSoonPipe } from '../../pipes/due-soon-pipe';
import { StatusColor } from '../../directives/status-color';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    FormsModule,
    DueSoonPipe,
    StatusColor
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {

  @Input() task!: Task;

  isEditing = false;

  editTask() {
    this.isEditing = true;
  }

  saveTask() {
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

}