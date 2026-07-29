import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { TodoListComponent } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    TodoListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'todo-app';
}