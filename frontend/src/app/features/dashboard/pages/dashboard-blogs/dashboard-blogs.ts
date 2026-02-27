import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { blogInterface } from '../../../blogs/interfaces/blog.interface';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { RouterLink } from "@angular/router";
import { needConfirmation } from '../../../../shared/decorators/confirm-dialog.decorator';
import { NgClass } from '@angular/common';
import { ShowMorePipePipe } from '../../../../shared/pipes/show-more.pipe-pipe';

@Component({
  selector: 'app-dashboard-blogs',
  imports: [DateFormatPipe, RouterLink, NgClass, ShowMorePipePipe],
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

  @needConfirmation()
  hideBlog(blogId: number) {
    this.dashboardService.submitHideBlog(blogId).subscribe(response => {
      this.blogs.set(
        this.blogs()?.map(blog => {
          if (blog.id === blogId) {
            blog.is_hidden = !blog.is_hidden
          }
          return blog
        }) ?? []
      )
    })
  }

  @needConfirmation()
  deleteBlog(blogId: number) {
    this.dashboardService.submitDeleteBlog(blogId).subscribe(response => {
      this.blogs.set(
        this.blogs()?.filter(blog => blog.id !== blogId) ?? []
      )
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
