import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Task, TaskStatus } from '@app/tasks/model/task.model';
import { KanbanColumn } from '../models/kanban-column.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private translateService = inject(TranslateService);

  private readonly columnConfig: Record<TaskStatus, { translationKey: string; color: string; icon: string }> = {
    [TaskStatus.ON_HOLD]: {
      translationKey: 'kanban.columns.onHold',
      color: '#f59e42',
      icon: 'pause_circle_outline'
    },
    [TaskStatus.IN_PROGRESS]: {
      translationKey: 'kanban.columns.inProgress',
      color: '#3b82f6',
      icon: 'autorenew'
    },
    [TaskStatus.COMPLETED]: {
      translationKey: 'kanban.columns.completed',
      color: '#22c55e',
      icon: 'check_circle_outline'
    },
    [TaskStatus.DONE]: {
      translationKey: 'kanban.columns.done',
      color: '#14b8a6',
      icon: 'done_all'
    },
    [TaskStatus.EXPIRED]: {
      translationKey: 'kanban.columns.expired',
      color: '#ef4444',
      icon: 'error_outline'
    }
  };

  organizeTasksIntoColumns(tasks: Task[], translationPrefix: string = 'analyticsMember'): KanbanColumn[] {
    const columns: KanbanColumn[] = [];

    Object.values(TaskStatus).forEach(status => {
      const config = this.columnConfig[status];
      const columnTasks = tasks.filter(task => task.status === status);

      // Obtener la traducción usando el prefijo proporcionado
      const title = this.translateService.instant(`${translationPrefix}.${config.translationKey}`);

      columns.push({
        status,
        title,
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
