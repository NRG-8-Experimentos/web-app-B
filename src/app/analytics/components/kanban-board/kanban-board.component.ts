import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
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
  @Input() translationPrefix: string = 'analyticsMember.kanban';

  columns: KanbanColumn[] = [];

  constructor(private kanbanService: KanbanService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      this.columns = this.kanbanService.organizeTasksIntoColumns(this.tasks);
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Sin fecha';

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
