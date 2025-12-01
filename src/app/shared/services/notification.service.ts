import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Notification } from '../model/notification.entity';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseApiService<Notification> {

  constructor() {
    super();
    // Ajustamos el endpoint al que definiste en tu backend
    this.resourceEndPoint = '/member/notifications';
  }

  // Obtener todas las notificaciones
  getAllNotifications() {
    return this.http.get<Notification[]>(`${this.baseUrl}${this.resourceEndPoint}`);
  }

  // Marcar una notificación como leída (cerrarla)
  markAsRead(notificationId: number) {
    return this.http.patch(`${this.baseUrl}${this.resourceEndPoint}/${notificationId}/mark-read`, {});
  }
}
