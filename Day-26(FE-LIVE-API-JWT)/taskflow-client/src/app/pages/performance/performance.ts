import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';
import { Task, TaskService } from '../../services/task';

@Component({ selector: 'app-performance', imports: [CommonModule, RouterLink], templateUrl: './performance.html', styleUrl: '../workspace.css' })
export class Performance implements OnInit { tasks: Task[] = []; loading = true; error = ''; constructor(private service: TaskService, private auth: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) {} ngOnInit(): void { this.service.getTasks().pipe(finalize(() => { this.loading = false; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => this.tasks = response.tasks || [], error: (error) => this.error = error.status === 0 ? 'The live API could not be reached.' : 'Performance data could not be loaded.' }); } get user() { return this.auth.getUser(); } get completed() { return this.tasks.filter((task) => task.completed).length; } get open() { return this.tasks.filter((task) => !task.completed).length; } get progress() { return this.tasks.filter((task) => task.status === 'in-progress').length; } get rate() { return this.tasks.length ? Math.round(this.completed / this.tasks.length * 100) : 0; } get openWidth() { return this.tasks.length ? this.open / this.tasks.length * 100 : 0; } get progressWidth() { return this.tasks.length ? this.progress / this.tasks.length * 100 : 0; } get completedWidth() { return this.tasks.length ? this.completed / this.tasks.length * 100 : 0; } logout(): void { this.auth.logout(); this.router.navigate(['/login']); } }
