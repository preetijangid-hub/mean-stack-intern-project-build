export type TaskStatus =
  | 'Pending'
  | 'In Progress'
  | 'Completed';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
}
