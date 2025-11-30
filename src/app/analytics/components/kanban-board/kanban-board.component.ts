import { Component, HostListener, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { KanbanService } from '@app/analytics/domain/services/kanban.service';
import { KanbanColumn } from '@app/analytics/domain/models/kanban-column.model';
import { Task } from '@app/tasks/model/task.model';
import { TasksApiService } from '@app/tasks/services/tasks-api.service';

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
  private tasksApi = inject(TasksApiService);

  // Add dialog state
  selectedTask: Task | null = null;
  isDialogLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      this.columns = this.kanbanService.organizeTasksIntoColumns(this.tasks, this.translationPrefix);
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return this.translateService.instant(`${this.translationPrefix}.kanban.noDate`);
    }

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // New: load details from API and open dialog
  openTaskDetails(task: Task) {
    this.isDialogLoading = true;
    // open overlay immediately to provide feedback
    // keep selectedTask null until we have details (but overlay shows spinner)
    this.tasksApi.getById(task.id).subscribe({
      next: (full) => {
        this.selectedTask = full;
        document.body.style.overflow = 'hidden';
        this.isDialogLoading = false;
      },
      error: () => {
        // fallback to the minimal task we have
        this.selectedTask = task;
        document.body.style.overflow = 'hidden';
        this.isDialogLoading = false;
      }
    });
  }

  closeTaskDetails() {
    this.selectedTask = null;
    this.isDialogLoading = false;
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape')
  onEscapeHandler() {
    if (this.selectedTask || this.isDialogLoading) {
      this.closeTaskDetails();
    }
  }
}
