import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { SearchInput } from "../search-input/search-input";
import { NotificationService } from '../../../core/services/notification.service';
import { notificationInterface } from '../../../core/interfaces/notification.interface';
import { NgClass } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format-pipe';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SearchInput, NgClass, DateFormatPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private authStateService = inject(AuthStateService)
  private notificationService = inject(NotificationService)

  showDropdown = signal(false);
  userInfos = signal(this.authStateService.getCurrentUser())
  notifications = signal<notificationInterface[] | null>(null);
  isVisibleNotifs = signal(false);

  logout() {
    this.authStateService.setCurrentUser(null)
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login')
  }

  dropdownProfile(event: MouseEvent) {
    event.stopPropagation();
    this.showDropdown.update(prev => !prev)
  }

  getNotifications(event: MouseEvent) {
    event.stopPropagation()
    this.isVisibleNotifs.update(prev => !prev)
    if (!this.isVisibleNotifs()) return;
    this.notificationService.fetchNotifications().subscribe(res => {
      this.notifications.set(res)
    })
  }

  deleteNotification(notifId: number) {
    this.notificationService.submitDeleteNotification(notifId).subscribe(res => {
      this.notifications.set(this.notifications()?.filter(notif => notif.id !== notifId) ?? [])
    })
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showDropdown.set(false);
    this.isVisibleNotifs.set(false)
  }

}
