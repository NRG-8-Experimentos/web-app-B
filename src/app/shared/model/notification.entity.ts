export class Notification {
  id: number;
  message: string;
  relatedTaskId: number;
  isRead: boolean;
  createdAt: string;

  constructor() {
    this.id = 0;
    this.message = "";
    this.relatedTaskId = 0;
    this.isRead = false;
    this.createdAt = "";
  }
}
