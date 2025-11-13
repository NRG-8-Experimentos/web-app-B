import { Task, TaskStatus } from '@app/tasks/model/task.model';

export interface KanbanColumn {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
  icon: string;
}

