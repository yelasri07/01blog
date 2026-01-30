import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { blogInterface } from '../../../blogs/interfaces/blog.interface';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard-blogs',
  imports: [DateFormatPipe, RouterLink],
  templateUrl: './dashboard-blogs.html',
  styleUrl: './dashboard-blogs.scss',
})
export class DashboardBlogs implements OnInit {
  private dashboardService = inject(DashboardService)

  blogs = signal<blogInterface[] | null>(null);
  showOptions = signal(0);

  ngOnInit(): void {
    this.dashboardService.getBlogs().subscribe(response => {
      this.blogs.set(response)
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

  @HostListener("document:click")
  hideOptions() {
    this.showOptions.set(0)
  }
}
