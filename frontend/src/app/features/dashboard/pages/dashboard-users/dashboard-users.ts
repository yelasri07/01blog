import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { User } from '../../../../core/interfaces/user.interface';
import { CdkAriaLive } from "../../../../../../node_modules/@angular/cdk/types/_a11y-module-chunk";
import { RouterLink } from "@angular/router";
import { use } from 'marked';
import { AuthStateService } from '../../../../core/services/auth.state.service';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
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

  banUser(userId: number) {
    this.dashboardService.submitBan(userId).subscribe(response => {
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

  @HostListener("document:click")
  hideOptions() {
    this.showOptions.set(0)
  }
}
