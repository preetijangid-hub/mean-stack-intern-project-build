import { Component } from '@angular/core';

import { HeaderComponent } from './components/header/header';

import { TaskFormComponent } from './components/task-form/task-form';

import { TaskListComponent } from './components/task-list/task-list';

@Component({

selector:'app-root',

standalone:true,

imports:[
HeaderComponent,
TaskFormComponent,
TaskListComponent
],

templateUrl:'./app.html',

styleUrl:'./app.css'

})

export class AppComponent{}