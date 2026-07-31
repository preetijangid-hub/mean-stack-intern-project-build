import { Injectable, signal } from '@angular/core';

export interface Task {
  id:number;
  title:string;
  status:string;
}

@Injectable({
  providedIn:'root'
})

export class TaskService{

  tasks = signal<Task[]>([
    {
      id:1,
      title:'Learn Angular',
      status:'Pending'
    },
    {
      id:2,
      title:'Build Dashboard',
      status:'In Progress'
    },
    {
      id:3,
      title:'Deploy Project',
      status:'Completed'
    }
  ]);

  addTask(title:string){

    this.tasks.update(tasks=>[
      ...tasks,
      {
        id:Date.now(),
        title,
        status:'Pending'
      }
    ]);

  }

  deleteTask(id:number){

    this.tasks.update(tasks=>
      tasks.filter(task=>task.id!==id)
    );

  }

  editTask(id:number,title:string){

    this.tasks.update(tasks=>

      tasks.map(task=>

        task.id===id

        ? {...task,title}

        : task

      )

    );

  }

}