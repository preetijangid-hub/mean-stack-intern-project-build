/**
 * Team member model.
 *
 * The deployed backend does not expose team endpoints, so team members are
 * managed locally inside this Day-29 app and persisted in localStorage.
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  avatarColor?: string;
}

