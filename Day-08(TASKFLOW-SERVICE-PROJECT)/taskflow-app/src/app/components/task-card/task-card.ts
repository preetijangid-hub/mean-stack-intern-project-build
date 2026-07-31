import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/task';

@Component({
  selector:'app-task-card',
  standalone:true,
 imports:[],
  templateUrl:'./task-card.html',
  styleUrl:'./task-card.css'
})

export class TaskCardComponent{

@Input() task!:Task;

@Output() delete=new EventEmitter<number>();

@Output() edit=new EventEmitter<Task>();

deleteTask(){

this.delete.emit(this.task.id);

}

editTask(){

this.edit.emit(this.task);

}

}