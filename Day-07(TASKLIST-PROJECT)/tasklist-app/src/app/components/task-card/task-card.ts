import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCardComponent {

  @Input() title = '';
  @Input() status = '';
  @Input() priority = '';
}