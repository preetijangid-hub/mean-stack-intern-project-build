/**
 * Project model.
 *
 * The deployed backend does not expose project endpoints, so projects are
 * managed locally inside this Day-29 app and persisted in localStorage.
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  color?: string;
  createdAt?: string;
}

