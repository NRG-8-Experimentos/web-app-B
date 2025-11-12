import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '@app/tasks/model/task.model';
import { KanbanColumn } from '../models/kanban-column.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  private readonly columnConfig: Record<TaskStatus, { title: string; color: string; icon: string }> = {
    [TaskStatus.ON_HOLD]: {
      title: 'En Espera',
      color: '#f59e42',
      icon: 'pause_circle_outline'
    },
    [TaskStatus.IN_PROGRESS]: {
      title: 'En Progreso',
      color: '#3b82f6',
      icon: 'autorenew'
    },
    [TaskStatus.COMPLETED]: {
      title: 'Completado',
      color: '#22c55e',
      icon: 'check_circle_outline'
    },
    [TaskStatus.DONE]: {
      title: 'Finalizado',
      color: '#14b8a6',
      icon: 'done_all'
    },
    [TaskStatus.EXPIRED]: {
      title: 'Vencido',
      color: '#ef4444',
      icon: 'error_outline'
    }
  };

  organizeTasksIntoColumns(tasks: Task[]): KanbanColumn[] {
    const columns: KanbanColumn[] = [];

    Object.values(TaskStatus).forEach(status => {
      const config = this.columnConfig[status];
      const columnTasks = tasks.filter(task => task.status === status);

      columns.push({
        status,
        title: config.title,
        tasks: columnTasks,
        color: config.color,
        icon: config.icon
      });
    });

    return columns;
  }

  getTaskCountByStatus(tasks: Task[], status: TaskStatus): number {
    return tasks.filter(task => task.status === status).length;
  }
}
