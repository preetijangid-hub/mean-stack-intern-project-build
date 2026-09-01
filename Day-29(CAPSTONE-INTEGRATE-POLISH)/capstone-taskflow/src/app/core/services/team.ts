import { Injectable, computed, signal } from '@angular/core';
import { TeamMember } from '../../models/team-member.model';

const STORAGE_KEY = 'taskflow.teamMembers';

/**
 * Starter team used until the user customizes it. Fixed ids keep
 * task->assignee metadata references stable across sessions.
 */
const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'member-alex-morgan',
    name: 'Alex Morgan',
    role: 'Project Manager',
    email: 'alex.morgan@taskflow.io',
    avatarColor: '#6366f1',
  },
  {
    id: 'member-priya-sharma',
    name: 'Priya Sharma',
    role: 'Frontend Developer',
    email: 'priya.sharma@taskflow.io',
    avatarColor: '#0ea5e9',
  },
  {
    id: 'member-john-carter',
    name: 'John Carter',
    role: 'Backend Developer',
    email: 'john.carter@taskflow.io',
    avatarColor: '#f59e0b',
  },
  {
    id: 'member-sara-khan',
    name: 'Sara Khan',
    role: 'UI/UX Designer',
    email: 'sara.khan@taskflow.io',
    avatarColor: '#ec4899',
  },
  {
    id: 'member-david-lee',
    name: 'David Lee',
    role: 'QA Engineer',
    email: 'david.lee@taskflow.io',
    avatarColor: '#10b981',
  },
];

/**
 * Local team provider. The deployed backend has no team endpoints, so team
 * members live in localStorage (seeded with sensible defaults).
 */
@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly teamSignal = signal<TeamMember[]>(this.loadTeamMembers());

  /** Reactive list of team members. */
  readonly teamMembers = computed(() => this.teamSignal());

  getTeamMembers(): TeamMember[] {
    return this.teamSignal();
  }

  getTeamMemberById(id: string | null | undefined): TeamMember | null {
    if (!id) {
      return null;
    }
    return this.teamSignal().find((member) => member.id === id) ?? null;
  }

  /** Creates and persists a new local team member. */
  createTeamMember(name: string, role: string): TeamMember {
    const member: TeamMember = {
      id: `member-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      role: role.trim() || 'Team Member',
      avatarColor: '#6366f1',
    };
    this.teamSignal.update((members) => [...members, member]);
    this.persistTeamMembers(this.teamSignal());
    return member;
  }

  /** Updates an existing local team member's name/role. */
  updateMember(id: string, name: string, role: string): TeamMember | null {
    const trimmedName = name.trim();
    const trimmedRole = role.trim();
    if (!trimmedName || !trimmedRole) {
      return null;
    }
    const current = this.teamSignal();
    const index = current.findIndex((member) => member.id === id);
    if (index === -1) {
      return null;
    }
    const updated: TeamMember = { ...current[index], name: trimmedName, role: trimmedRole };
    const next = [...current];
    next[index] = updated;
    this.teamSignal.set(next);
    this.persistTeamMembers(next);
    return updated;
  }

  /** Deletes a local team member by id (tasks keep working via "Unassigned"). */
  deleteMember(id: string): void {
    this.teamSignal.update((members) => members.filter((member) => member.id !== id));
    this.persistTeamMembers(this.teamSignal());
  }

  // ------------------------------------------------------------------

  private loadTeamMembers(): TeamMember[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return DEFAULT_TEAM;
      }
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return DEFAULT_TEAM;
      }
      const members: TeamMember[] = [];
      for (const item of parsed) {
        const member = this.normalizeMember(item);
        if (member) {
          members.push(member);
        }
      }
      return members.length > 0 ? members : DEFAULT_TEAM;
    } catch {
      return DEFAULT_TEAM;
    }
  }

  private normalizeMember(raw: unknown): TeamMember | null {
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
      role: typeof record['role'] === 'string' ? record['role'] : 'Team Member',
      email: typeof record['email'] === 'string' ? record['email'] : undefined,
      avatarColor: typeof record['avatarColor'] === 'string' ? record['avatarColor'] : undefined,
    };
  }

  private persistTeamMembers(members: TeamMember[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch {
      // Storage unavailable; in-memory state still works for this session.
    }
  }
}

