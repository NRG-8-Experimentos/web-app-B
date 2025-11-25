import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksApiService, Task } from '../../services/tasks-api.service';
import {TranslatePipe} from '@ngx-translate/core';
import { RequestApiService } from '@app/requests/services/request-api.service';
import { Request } from '@app/requests/model/request.entity';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule, TranslatePipe, FormsModule],
  templateUrl: './view-task.html',
  styleUrls: ['./view-task.css']
})
export class ViewTaskComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(TasksApiService);
  private requestApi = inject(RequestApiService);

  task?: Task;
  loading = true;
  comments: Request[] = [];
  loadingComments = false;
  newComment = '';
  savingComment = false;
  showCommentForm = false;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.back(); return; }
    this.api.getById(id).subscribe({
      next: (t) => {
        this.task = t;
        this.loading = false;
        this.loadComments(id);
      },
      error: () => { alert('No se pudo cargar la tarea'); this.back(); }
    });
  }

  loadComments(taskId: number) {
    this.loadingComments = true;
    this.requestApi.getRequestsByTaskId(taskId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.loadingComments = false;
      },
      error: () => {
        this.loadingComments = false;
      }
    });
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
    if (!this.showCommentForm) {
      this.newComment = '';
    }
  }

  addComment() {
    if (!this.newComment.trim() || !this.task?.id) return;
    this.savingComment = true;
    this.requestApi.createRequest(this.task.id, this.newComment.trim(), 'MODIFICATION').subscribe({
      next: () => {
        this.newComment = '';
        this.savingComment = false;
        this.showCommentForm = false;
        this.loadComments(this.task!.id);
      },
      error: () => {
        alert('No se pudo agregar el comentario');
        this.savingComment = false;
      }
    });
  }

  back() {
    const fromState = (history.state && history.state.from) as string | null;
    if (fromState === 'member') {
      this.router.navigate(['/members/my-group/tasks']);
      return;
    }
    const isMemberPath = this.router.url.startsWith('/members/');
    this.router.navigate([isMemberPath ? '/members/my-group/tasks' : '/leaders/my-group/tasks']);
  }

  progressClass(): 'ok' | 'warn' | 'late' | 'unknown' {
    if (!this.task?.dueDate) return 'unknown';
    const end = new Date(this.task.dueDate).getTime();
    const start = this.task.createdAt ? new Date(this.task.createdAt).getTime() : Date.now();
    if (end <= start) return Date.now() > end ? 'late' : 'unknown';
    const now = Date.now();
    if (now > end) return 'late';
    const ratio = (now - start) / (end - start);
    return ratio < 0.7 ? 'ok' : 'warn';
  }
}
