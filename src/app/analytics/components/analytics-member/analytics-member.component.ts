import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '@app/shared/model/member.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { Task } from '@app/tasks/model/task.model';

@Component({
  selector: 'app-analytics-member',
  standalone: true,
  imports: [CommonModule, TranslatePipe, KanbanBoardComponent],
  templateUrl: './analytics-member.component.html',
  styleUrl: './analytics-member.component.css'
})
export class AnalyticsMemberComponent {
  @Input() member: Member | null = null;
  @Input() overview: any = {};
  @Input() loadingTasks: boolean = false;
  @Input() memberTasks: any[] = [];
  @Input() kanbanTasks: Task[] = [];
  @Input() rescheduled: any = {};
  @Input() avgCompletion: any = {};
  @Input() formatAvgCompletionTime!: (minutes: number) => string;
  @Input() totalInProgressDuration: number = 0;
  @Input() formatInProgressDuration!: (hours: number) => string;
  @Input() inProgressTaskDurations: { taskId: number, title: string, duration: number }[] = [];
}
