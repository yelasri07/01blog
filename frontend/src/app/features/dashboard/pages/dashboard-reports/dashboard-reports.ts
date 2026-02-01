import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { reportInterface } from '../../interfaces/report.interface';
import { RouterLink } from "@angular/router";
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { ShowMorePipePipe } from '../../../../shared/pipes/show-more.pipe-pipe';

@Component({
  selector: 'app-dashboard-reports',
  imports: [RouterLink, DateFormatPipe, ShowMorePipePipe],
  templateUrl: './dashboard-reports.html',
  styleUrl: './dashboard-reports.scss',
})
export class DashboardReports implements OnInit {
  private dashboardServoce = inject(DashboardService)

  reports = signal<reportInterface[] | null>(null)
  isVisibleReason = signal("");

  ngOnInit(): void {
    this.dashboardServoce.getReports().subscribe(res => {
      this.reports.set(res)
    })
  }

  showReason(event: MouseEvent, value: string) {
    event.stopPropagation()
    this.isVisibleReason.set(value)
  }

  @HostListener("document:click")
  hideReason() {
    this.isVisibleReason.set("")
  }
}
