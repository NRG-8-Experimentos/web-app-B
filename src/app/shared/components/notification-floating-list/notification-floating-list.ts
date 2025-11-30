import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../model/notification.entity';

@Component({
  selector: 'app-notification-floating-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-floating-list.html',
  styleUrls: ['./notification-floating-list.css']
})
export class NotificationFloatingListComponent implements OnInit {

  private notificationService = inject(NotificationService);

  public notifications: Notification[] = [];

  ngOnInit(): void {
    this.loadNotifications();
  }

  public loadNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next: (data: any) => {
        const list = Array.isArray(data) ? data : [];
        this.notifications = list.filter((n: Notification) => !n.isRead);
        this.notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      error: (err) => console.error('Error cargando notificaciones', err)
    });
  }

  public closeNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationService.markAsRead(id).subscribe({
      error: (err) => console.error('Error al marcar como leída', err)
    });
  }

  public trackById(_index: number, item: Notification) {
    return item.id;
  }
}
