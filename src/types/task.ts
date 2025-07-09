export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';