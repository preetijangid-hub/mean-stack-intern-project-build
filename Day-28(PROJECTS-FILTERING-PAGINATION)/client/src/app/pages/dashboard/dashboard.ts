import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Task, TaskService } from '../../services/task.service';

@Component({ selector: 'app-dashboard', standalone: true, imports: [CommonModule, FormsModule, RouterLink], templateUrl: './dashboard.html', styleUrl: './dashboard.css' })
export class Dashboard implements OnInit {
  private readonly taskService = inject(TaskService); private readonly authService = inject(AuthService); private readonly router = inject(Router); private readonly changeDetector = inject(ChangeDetectorRef);
  tasks: Task[] = []; loading = false; creating = false; updating = ''; deleting = ''; error = ''; success = ''; query = ''; filter: 'all' | 'open' | 'completed' = 'all'; page = 1; readonly pageSize = 5; showForm = false; editingTask: Task | null = null; title = ''; description = '';
  ngOnInit(): void { this.loadTasks(); }
  get user() { return this.authService.getUser(); }
  get filteredTasks(): Task[] { const q = this.query.trim().toLowerCase(); return this.tasks.filter((task) => `${task.title} ${task.description || ''}`.toLowerCase().includes(q) && (this.filter === 'all' || (this.filter === 'completed' ? task.completed : !task.completed))); }
  get visibleTasks(): Task[] { const start = (this.page - 1) * this.pageSize; return this.filteredTasks.slice(start, start + this.pageSize); }
  get pageCount(): number { return Math.max(1, Math.ceil(this.filteredTasks.length / this.pageSize)); }
  setFilter(filter: 'all' | 'open' | 'completed'): void { this.filter = filter; this.page = 1; }
  setQuery(query: string): void { this.query = query; this.page = 1; }
  previousPage(): void { this.page = Math.max(1, this.page - 1); }
  nextPage(): void { this.page = Math.min(this.pageCount, this.page + 1); }
  get completedCount(): number { return this.tasks.filter((task) => task.completed).length; }
  get openCount(): number { return this.tasks.length - this.completedCount; }
  loadTasks(): void { this.loading = true; this.error = ''; this.taskService.getTasks().pipe(finalize(() => { this.loading = false; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => { this.tasks = response.tasks; this.page = Math.min(this.page, this.pageCount); }, error: (error) => this.handleError(error, 'Unable to load tasks. Please try again.') }); }
  openCreateForm(): void { this.editingTask = null; this.title = ''; this.description = ''; this.error = ''; this.showForm = true; }
  openEditForm(task: Task): void { this.editingTask = task; this.title = task.title; this.description = task.description || ''; this.error = ''; this.showForm = true; }
  closeForm(): void { if (!this.creating && !this.updating) this.showForm = false; }
  saveTask(form: NgForm): void { if (form.invalid || this.creating || this.updating) { form.control.markAllAsTouched(); return; } const data = { title: this.title.trim(), description: this.description.trim() }; this.error = ''; this.success = ''; if (this.editingTask) { this.updateTask(this.editingTask, data); return; } this.creating = true; this.taskService.createTask(data.title, data.description).pipe(finalize(() => { this.creating = false; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => { this.tasks = [response.task, ...this.tasks]; this.success = 'Task created successfully.'; this.resetForm(); }, error: (error) => this.handleError(error, 'Unable to create task. Please try again.') }); }
  updateTask(task: Task, data: { title: string; description: string }): void { if (!task._id) return; this.updating = task._id; this.taskService.updateTask(task._id, data).pipe(finalize(() => { this.updating = ''; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => { this.tasks = this.tasks.map((item) => item._id === task._id ? response.task : item); this.success = 'Task updated successfully.'; this.resetForm(); }, error: (error) => this.handleError(error, 'Unable to update task. Please try again.') }); }
  toggleTask(task: Task): void { if (!task._id || this.updating || this.deleting) return; this.updating = task._id; this.taskService.updateTask(task._id, { completed: !task.completed }).pipe(finalize(() => { this.updating = ''; this.changeDetector.detectChanges(); })).subscribe({ next: (response) => { this.tasks = this.tasks.map((item) => item._id === task._id ? response.task : item); this.success = response.task.completed ? 'Task marked completed.' : 'Task moved to to-do.'; }, error: (error) => this.handleError(error, 'Unable to update task. Please try again.') }); }
  deleteTask(task: Task): void { if (!task._id || !confirm(`Delete "${task.title}"?`)) return; this.deleting = task._id; this.taskService.deleteTask(task._id).pipe(finalize(() => { this.deleting = ''; this.changeDetector.detectChanges(); })).subscribe({ next: () => { this.tasks = this.tasks.filter((item) => item._id !== task._id); this.success = 'Task deleted successfully.'; }, error: (error) => this.handleError(error, 'Unable to delete task. Please try again.') }); }
  logout(): void { this.authService.logout(); this.router.navigateByUrl('/login'); }
  private resetForm(): void { this.showForm = false; this.editingTask = null; this.title = ''; this.description = ''; }
  private handleError(error: { status?: number; error?: { message?: string } }, fallback: string): void { if (error.status === 401) { this.authService.logout(); this.router.navigateByUrl('/login'); return; } this.error = error.status === 0 ? 'The live API could not be reached. Check your connection.' : error.error?.message || fallback; }
}