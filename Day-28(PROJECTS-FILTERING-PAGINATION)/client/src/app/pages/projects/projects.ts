import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Project, ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);

  projects: Project[] = [];
  page = 1;
  limit = 6;
  total = 0;
  totalPages = 1;
  query = '';
  loading = false;
  creating = false;
  error = '';
  success = '';
  showForm = false;
  name = '';
  description = '';
  team = '';

  ngOnInit(): void {
    this.loadProjects();
  }

  get user() {
    return this.auth.getUser();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = '';

    this.projectService
      .getProjects(this.page, this.limit, this.query)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.projects = response.projects;
          this.total = response.total;
          this.totalPages = Math.max(response.totalPages, 1);
        },
        error: (error) =>
          this.handleError(error, 'Unable to load projects. Please try again.'),
      });
  }

  searchProjects(): void {
    this.page = 1;
    this.loadProjects();
  }

  previousPage(): void {
    if (this.page > 1 && !this.loading) {
      this.page--;
      this.loadProjects();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages && !this.loading) {
      this.page++;
      this.loadProjects();
    }
  }

  openCreateForm(): void {
    this.name = '';
    this.description = '';
    this.team = '';
    this.error = '';
    this.showForm = true;
  }

  closeForm(): void {
    if (!this.creating) {
      this.showForm = false;
    }
  }

  saveProject(form: NgForm): void {
    if (form.invalid || this.creating) {
      form.control.markAllAsTouched();
      return;
    }

    this.creating = true;

    this.projectService
      .createProject(
        this.name.trim(),
        this.description.trim(),
        this.team.split(',').map((item) => item.trim()).filter(Boolean)
      )
      .pipe(
        finalize(() => {
          this.creating = false;
          this.changeDetector.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.showForm = false;
          this.success = 'Project created successfully.';
          this.page = 1;
          this.loadProjects();
        },
        error: (error) =>
          this.handleError(error, 'Unable to create project. Please try again.'),
      });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  private handleError(
    error: { status?: number; error?: { message?: string } },
    fallback: string
  ): void {
    if (error.status === 401) {
      this.auth.logout();
      this.router.navigateByUrl('/login');
      return;
    }

    this.error =
      error.status === 0
        ? 'The live API could not be reached. Check your connection.'
        : error.error?.message || fallback;
  }
}