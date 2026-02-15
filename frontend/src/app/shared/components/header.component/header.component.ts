import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { SearchInput } from "../search-input/search-input";
import { NotificationService } from '../../../core/services/notification.service';
import { notificationInterface } from '../../../core/interfaces/notification.interface';
import { NgClass } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SearchInput, NgClass, DateFormatPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authStateService = inject(AuthStateService)
  private notificationService = inject(NotificationService)
  private breakpointObserver = inject(BreakpointObserver)

  showDropdown = signal(false);
  userInfos = signal(this.authStateService.getCurrentUser())
  notifications = signal<notificationInterface[] | null>(null);
  isVisibleNotifs = signal(false);
  isVisibleMenu = signal(false);
  showMenu = signal(false);
  notificationsCount = signal(0);

  private breakpointsSubscription!: Subscription;

  ngOnInit(): void {
    this.breakpointsSubscription = this.breakpointObserver.observe(['(max-width: 839.98px)']).subscribe(res => {
      this.isVisibleMenu.set(res.matches)
    })

    this.notificationService.getUnreadNotificationsCount().subscribe(res => {
      this.notificationsCount.set(res)
    })
  }

  ngOnDestroy(): void {
    this.breakpointsSubscription.unsubscribe()
  }

  logout() {
    this.authStateService.setCurrentUser(null)
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login')
  }

  dropdownProfile(event: MouseEvent) {
    event.stopPropagation();
    this.showDropdown.update(prev => !prev)
    this.isVisibleNotifs.set(false)
  }

  getNotifications(event: MouseEvent) {
    event.stopPropagation()
    this.isVisibleNotifs.update(prev => !prev)
    this.showMenu.set(false)
    this.showDropdown.set(false);
    if (!this.isVisibleNotifs()) return;
    this.notificationService.fetchNotifications().subscribe(res => {
      this.notifications.set(res)
    })
  }

  deleteNotification(notifId: number, event: MouseEvent) {
    event.stopPropagation();
    this.notificationService.submitDeleteNotification(notifId).subscribe(res => {
      this.notifications.set(this.notifications()?.filter(notif => notif.id !== notifId) ?? [])
    })
  }

  updateNotificationStatus(notifId: number, event: MouseEvent) {
    event.stopPropagation();
    this.notificationService.submitUpdateNotificationStatus(notifId).subscribe(res => {
      this.notifications.set(
        this.notifications()?.map(notif => {
          if (notif.id === notifId) notif.is_read = res.is_read
          return notif
        }) ?? []
      )
    })
  }

  showMenuOptions(event: MouseEvent) {
    event.stopPropagation();
    this.showMenu.update(prev => !prev);
    this.isVisibleNotifs.set(false)
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showDropdown.set(false);
    this.isVisibleNotifs.set(false)
    this.showMenu.set(false);
  }

}
