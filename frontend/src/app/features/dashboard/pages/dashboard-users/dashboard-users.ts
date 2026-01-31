import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { User } from '../../../../core/interfaces/user.interface';
import { RouterLink } from "@angular/router";
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { needConfirmation } from '../../../../shared/decorators/confirm-dialog.decorator';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [RouterLink, NgClass],
  templateUrl: './dashboard-users.html',
  styleUrl: './dashboard-users.scss',
})
export class Users implements OnInit {
  private dashboardService = inject(DashboardService)
  private authStateService = inject(AuthStateService);
  currentUser = signal(this.authStateService.getCurrentUser());

  users = signal<User[] | null>(null);
  showOptions = signal(0);

  ngOnInit(): void {
    this.dashboardService.getUsers().subscribe(response => {
      this.users.set(response)
    })
  }

  displayOptions(event: MouseEvent, id: number) {
    event.stopPropagation()
    if (!this.showOptions()) {
      this.showOptions.set(id)
    } else {
      this.showOptions.set(0)
    }
  }

  @needConfirmation()
  banUser(userId: number) {
    this.dashboardService.submitBanUser(userId).subscribe(response => {
      this.users.set(
        this.users()?.map<User>(user => {
          if (user.id === userId) {
            user.is_banned = !user.is_banned
          }
          return user
        }) ?? []
      )
    })
  }

  @needConfirmation()
  deleteUser(userId: number) {
    this.dashboardService.submitDeleteUser(userId).subscribe(response => {
      this.users.set(
        this.users()?.filter(user => user.id !== userId) ?? []
      )
    })
  }

  @HostListener("document:click")
  hideOptions() {
    this.showOptions.set(0)
  }
}
