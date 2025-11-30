import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Component, OnInit} from '@angular/core';
import {ShortMember} from '@app/shared/model/short-member.entity';
import {GroupService} from '@app/groups/services/group.service';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-members-leader',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf, MatCardModule, MatIconModule, TranslatePipe],
  template: `
    <div class="p-8 min-h-screen members-leader-wrapper">
      <h2 class="text-2xl font-bold mb-6">{{ 'membersLeader.title' | translate }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <mat-card
          *ngFor="let member of members; let idx = index"
          class="rounded-2xl shadow-md bg-neutral-100 px-2 py-2"
          style="cursor:pointer; min-width: 410px; max-width: 520px"
          (click)="goToTaskDetails(member.id)"
        >
          <div class="flex items-center px-4 pt-4 pb-2">
            <img [src]="member.imgUrl" alt="{{member.name}}" class="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow" />
            <span class="font-semibold text-xl text-slate-800">{{ member.name }} {{ member.surname }}</span>
          </div>
          <ng-container *ngIf="member.task">
            <div class="member-task-card mt-3 mx-2 px-5 py-5">
              <div class="text-xl font-semibold mb-2">{{ member.task.title }}</div>
              <hr class="my-1 themed-border">
              <div class="text-base">{{ member.task.description }}</div>
            </div>

            <div class="mt-5 mx-6 h-3 rounded-full"
              [ngStyle]="{ background: getBarColor(member.task.status) }">
            </div>
            <div class="text-base text-center tracking-wide mt-1 mb-1 text-gray-700 font-medium">
              {{ member.task.dueDate | date:'MM/dd/yyyy' }} - {{ member.task.createdAt | date:'MM/dd/yyyy' }}
            </div>
          </ng-container>
          <ng-container *ngIf="!member.task">
            <div class="rounded-xl shadow bg-gray-200 mt-4 mb-2 mx-3 px-4 py-4 text-gray-600 flex items-center justify-center min-h-20">{{ 'membersLeader.noTasks' | translate }}</div>
          </ng-container>
        </mat-card>
      </div>
      <ng-template #noMembers>
        <p class="text-gray-700"> {{ 'membersLeader.noMembers' | translate }} </p>
      </ng-template>
    </div>
  `,
  styles: [`
    .members-leader-wrapper {
      background: var(--bg);
      color: var(--text);
    }

    mat-card {
      box-shadow: 0 8px 24px #0001;
      background: var(--surface) !important;
      color: var(--text) !important;
      border: 1px solid var(--border);
    }

    .member-task-card {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,.05);
    }

    .themed-border { border-color: var(--border) !important; }
    :host .text-slate-800 {
      color: var(--text) !important;
    }

    :host .text-gray-700,
    :host .text-gray-600 {
      color: var(--muted) !important;
    }

    :host .bg-gray-200 {
      background: var(--surface-2) !important;
      color: var(--muted) !important;
      border: 1px solid var(--border) !important;
    }

    :host .themed-border {
      border-color: var(--border) !important;
    }

  `]
})
export class MembersLeaderComponent implements OnInit {
  members: (ShortMember & { // @ts-ignore
    task?: Task })[] = [];

  constructor(private groupService: GroupService, private router: Router) {}

  goToTaskDetails(memberId: number) {
    this.router.navigate([`/leaders/my-group/members/${memberId}/tasks`]);
  }

  ngOnInit() {
    const groupId = 1;
    forkJoin({
      members: this.groupService.getGroupMembers(),
      tasks: this.groupService.getAllTasksByGroupId(groupId)
    }).subscribe({
      next: ({members, tasks}) => {
        this.members = members.map(member => ({
          ...member,
          task: tasks.find(task => task.member && task.member.id === member.id)
        }));
      },
      error: (error) => {
        console.error('Error al obtener integrantes o tareas', error);
      }
    });


  }

  getBarColor(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return '#17c950';
      case 'IN_PROGRESS':
        return '#17c950'; // verde
      case 'EXPIRED':
        return '#ff3c3c'; // rojo
      case 'ON_HOLD':
        return '#ffe266';
      case 'PENDING':
        return '#ffe266'; // amarillo
      case 'DONE':
        return '#1e88e5'; // azul
      default:
        return '#c8c8c8';
    }
  }
}
