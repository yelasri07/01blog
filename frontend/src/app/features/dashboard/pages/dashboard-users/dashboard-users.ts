import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { User } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './dashboard-users.html',
  styleUrl: './dashboard-users.scss',
})
export class Users implements OnInit {
  private dashboardService = inject(DashboardService)

  users = signal<User[] | null>(null);
  showOptions = signal(false);

  ngOnInit(): void {
    this.dashboardService.getUsers().subscribe(response => {
      console.log(response);
      this.users.set(response)
    })
  }

}
