import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector:'app-task-detail',
  standalone:true,
  templateUrl:'./task-detail.html',
  styleUrl:'./task-detail.css'
})

export class TaskDetailComponent{

taskId='';

constructor(private route:ActivatedRoute){

this.taskId=this.route.snapshot.paramMap.get('id')!;

}

}