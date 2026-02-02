import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { reportInterface } from '../../interfaces/report.interface';
import { RouterLink } from "@angular/router";
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { ShowMorePipePipe } from '../../../../shared/pipes/show-more.pipe-pipe';
import { NgClass } from '@angular/common';
import { needConfirmation } from '../../../../shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-dashboard-reports',
  imports: [RouterLink, DateFormatPipe, ShowMorePipePipe, NgClass],
  templateUrl: './dashboard-reports.html',
  styleUrl: './dashboard-reports.scss',
})
export class DashboardReports implements OnInit {
  private dashboardService = inject(DashboardService)

  reports = signal<reportInterface[] | null>(null)
  isVisibleReason = signal("");
  showOptions = signal(0);

  ngOnInit(): void {
    this.dashboardService.getReports().subscribe(res => {
      this.reports.set(res)
    })
  }

  showReason(event: MouseEvent, value: string) {
    event.stopPropagation()
    this.isVisibleReason.set(value)
  }

  displayOptions(event: MouseEvent, reportId: number) {
    event.stopPropagation()
    if (this.showOptions()) {
      this.showOptions.set(0)
    } else {
      this.showOptions.set(reportId)
    }
  }

  @needConfirmation()
  deleteReport(reportId: number) {
    this.dashboardService.submitDeleteReport(reportId).subscribe(res => {
      this.reports.set(
        this.reports()?.filter(report => report.id !== reportId) ?? []
      )
    })
  }

  @needConfirmation()
  changeReportStatus(reportId: number, status: string) {
    this.dashboardService.submitReportStatus(reportId, status).subscribe(res => {
      this.reports.set(
        this.reports()?.map(report => {
          if (report.id === reportId) {
            report.status = status
          }
          return report
        }) ?? []
      )
    })
  }

  @HostListener("document:click")
  hideReason() {
    this.isVisibleReason.set("")
    this.showOptions.set(0)
  }
}
