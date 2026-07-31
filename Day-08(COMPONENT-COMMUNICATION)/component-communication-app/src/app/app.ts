import { Component } from '@angular/core';
import { ParentComponent } from './components/parent/parent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}