import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { KanbanService } from '@app/analytics/domain/services/kanban.service';
import { KanbanColumn } from '@app/analytics/domain/models/kanban-column.model';
import { Task } from '@app/tasks/model/task.model';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Input() loading: boolean = false;
  @Input() translationPrefix: string = 'analyticsLeader';

  columns: KanbanColumn[] = [];

  private kanbanService = inject(KanbanService);
  private translateService = inject(TranslateService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      this.columns = this.kanbanService.organizeTasksIntoColumns(this.tasks, this.translationPrefix);
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return this.translateService.instant(`${this.translationPrefix}noDate`);
    }

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
