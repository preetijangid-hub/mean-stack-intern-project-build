import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';
import { Task, TaskService } from '../../services/task';

@Component({ selector: 'app-tasks', imports: [CommonModule, FormsModule, RouterLink], templateUrl: './tasks.html', styleUrl: '../workspace.css' })
export class Tasks implements OnInit {
  tasks: Task[] = []; loading = true; saving = false; error = ''; success = ''; query = ''; filter = 'all'; sort = 'newest'; showForm = false; title = ''; description = '';
  constructor(private taskService: TaskService, private auth: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void { this.loadTasks(); }
  get user() { return this.auth.getUser(); }
  get visibleTasks(): Task[] { const result = this.tasks.filter((task) => { const text = `${task.title} ${task.description || ''}`.toLowerCase(); const matchesQuery = text.includes(this.query.toLowerCase().trim()); const matchesFilter = this.filter === 'all' || (this.filter === 'completed' ? task.completed : this.filter === 'in-progress' ? task.status === 'in-progress' : !task.completed); return matchesQuery && matchesFilter; }); return [...result].sort((a,b) => this.sort === 'az' ? a.title.localeCompare(b.title) : (this.sort === 'za' ? b.title.localeCompare(a.title) : 0)); }
  loadTasks(): void { this.loading = true; this.error = ''; this.taskService.getTasks().pipe(finalize(() => { this.loading = false; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => this.tasks = response.tasks || [], error: (error) => this.error = this.message(error, 'Tasks could not be loaded.') }); }
  createTask(): void { if (!this.title.trim() || this.saving) return; this.saving = true; this.error = ''; this.taskService.createTask({ title: this.title.trim(), description: this.description.trim() || undefined }).pipe(finalize(() => { this.saving = false; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => { this.tasks = [response.task, ...this.tasks]; this.title = ''; this.description = ''; this.showForm = false; this.success = 'Task created successfully.'; }, error: (error) => this.error = this.message(error, 'Task could not be created.') }); }
  toggle(task: Task): void { if (!task._id) return; const previous = task.completed; task.completed = !task.completed; this.taskService.updateTask(task._id, { completed: task.completed }).subscribe({ error: (error) => { task.completed = previous; this.error = this.message(error, 'Task could not be updated.'); this.changeDetector.detectChanges(); } }); }
  remove(task: Task): void { if (!task._id) return; this.taskService.deleteTask(task._id).subscribe({ next: () => { this.tasks = this.tasks.filter((item) => item._id !== task._id); this.success = 'Task deleted.'; }, error: (error) => this.error = this.message(error, 'Task could not be deleted.') }); }
  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }
  private message(error: { status?: number; error?: { message?: string }; message?: string }, fallback: string): string { return error.status === 0 ? 'The live API could not be reached.' : error.error?.message || error.message || fallback; }
}
