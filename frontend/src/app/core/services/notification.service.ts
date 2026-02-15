import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/API_URL';
import { notificationInterface } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient)

  fetchNotifications() {
    return this.http.get<notificationInterface[]>(API_URL + "/notification")
  }

  getUnreadNotificationsCount() {
    return this.http.get<number>(API_URL + "/notification/unread/count")
  }

  submitDeleteNotification(notifId: number) {
    return this.http.delete(API_URL + `/notification/${notifId}`)
  }

  submitUpdateNotificationStatus(notifId: number) {
    return this.http.patch<{ message: string, is_read: boolean }>(API_URL + `/notification/${notifId}`, {})
  }
}
