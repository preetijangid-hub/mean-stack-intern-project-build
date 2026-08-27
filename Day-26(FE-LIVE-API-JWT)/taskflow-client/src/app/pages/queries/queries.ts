import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';
import { Task, TaskService } from '../../services/task';

@Component({ selector: 'app-queries', imports: [CommonModule, FormsModule, RouterLink], templateUrl: './queries.html', styleUrl: '../workspace.css' })
export class Queries implements OnInit { tasks: Task[] = []; loading = true; error = ''; query = ''; filter = 'all'; constructor(private service: TaskService, private auth: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) {} ngOnInit(): void { this.load(); } load(): void { this.loading = true; this.service.getTasks().pipe(finalize(() => { this.loading = false; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => this.tasks = response.tasks || [], error: (error) => this.error = error.status === 0 ? 'The live API could not be reached.' : 'Search data could not be loaded.' }); } get results(): Task[] { const query = this.query.trim().toLowerCase(); return this.tasks.filter((task) => { const haystack = `${task.title} ${task.description || ''}`.toLowerCase(); const statusMatch = this.filter === 'all' || (this.filter === 'completed' ? task.completed : this.filter === 'in-progress' ? task.status === 'in-progress' : !task.completed); return (!query || haystack.includes(query)) && statusMatch; }); } clear(): void { this.query = ''; this.filter = 'all'; } logout(): void { this.auth.logout(); this.router.navigate(['/login']); } }
