import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { DashboardCard } from './components/dashboard-card/dashboard-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, DashboardCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}