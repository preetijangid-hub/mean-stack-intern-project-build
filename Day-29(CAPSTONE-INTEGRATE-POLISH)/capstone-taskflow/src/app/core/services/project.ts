import { Injectable, computed, signal } from '@angular/core';
import { Project } from '../../models/project.model';

const STORAGE_KEY = 'taskflow.projects';

/**
 * Starter projects used until the user customizes them. Fixed ids keep
 * task->project metadata references stable across sessions.
 */
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'project-website-redesign',
    name: 'Website Redesign',
    description: 'Modernize the public marketing site with a fresh design system and faster pages.',
    color: '#6366f1',
  },
  {
    id: 'project-mobile-app',
    name: 'Mobile App',
    description: 'Ship the cross-platform TaskFlow mobile client for iOS and Android.',
    color: '#0ea5e9',
  },
  {
    id: 'project-api-integration',
    name: 'API Integration',
    description: 'Connect the TaskFlow frontend with the live REST API and harden error handling.',
    color: '#f59e0b',
  },
  {
    id: 'project-marketing',
    name: 'Marketing Campaign',
    description: 'Plan launch content, emails and social media for the TaskFlow release.',
    color: '#ec4899',
  },
  {
    id: 'project-internal-tools',
    name: 'Internal Tools',
    description: 'Improve internal dashboards and automation used by the operations team.',
    color: '#10b981',
  },
];

/**
 * Local project provider. The deployed backend has no project endpoints,
 * so projects live in localStorage (seeded with sensible defaults).
 */
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly projectsSignal = signal<Project[]>(this.loadProjects());

  /** Reactive list of projects. */
  readonly projects = computed(() => this.projectsSignal());

  getProjects(): Project[] {
    return this.projectsSignal();
  }

  getProjectById(id: string | null | undefined): Project | null {
    if (!id) {
      return null;
    }
    return this.projectsSignal().find((project) => project.id === id) ?? null;
  }

  /** Creates and persists a new local project. */
  createProject(name: string, description: string): Project {
    const project: Project = {
      id: `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      description: description.trim(),
      color: '#6366f1',
      createdAt: new Date().toISOString(),
    };
    this.projectsSignal.update((projects) => [project, ...projects]);
    this.persistProjects(this.projectsSignal());
    return project;
  }

  /** Updates an existing local project's name/description. */
  updateProject(id: string, name: string, description: string): Project | null {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return null;
    }
    const current = this.projectsSignal();
    const index = current.findIndex((project) => project.id === id);
    if (index === -1) {
      return null;
    }
    const updated: Project = {
      ...current[index],
      name: trimmedName,
      description: description.trim(),
    };
    const next = [...current];
    next[index] = updated;
    this.projectsSignal.set(next);
    this.persistProjects(next);
    return updated;
  }

  /** Deletes a local project by id (tasks keep working via "No Project"). */
  deleteProject(id: string): void {
    this.projectsSignal.update((projects) => projects.filter((project) => project.id !== id));
    this.persistProjects(this.projectsSignal());
  }

  // ------------------------------------------------------------------

  private loadProjects(): Project[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return DEFAULT_PROJECTS;
      }
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return DEFAULT_PROJECTS;
      }
      const projects: Project[] = [];
      for (const item of parsed) {
        const project = this.normalizeProject(item);
        if (project) {
          projects.push(project);
        }
      }
      return projects.length > 0 ? projects : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  }

  private normalizeProject(raw: unknown): Project | null {
    if (!raw || typeof raw !== 'object') {
      return null;
    }
    const record = raw as Record<string, unknown>;
    const id = typeof record['id'] === 'string' ? record['id'] : '';
    const name = typeof record['name'] === 'string' ? record['name'] : '';
    if (!id || !name) {
      return null;
    }
    return {
      id,
      name,
      description: typeof record['description'] === 'string' ? record['description'] : '',
      color: typeof record['color'] === 'string' ? record['color'] : undefined,
      createdAt: typeof record['createdAt'] === 'string' ? record['createdAt'] : undefined,
    };
  }

  private persistProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Storage unavailable; in-memory state still works for this session.
    }
  }
}

