import { Component, EventEmitter, HostListener, inject, input, Output, signal } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { RouterLink } from "@angular/router";
import { ReportModalComponent } from "../report-modal.component/report-modal.component";
import { SuccessPopupComponent } from "../success-popup.component/success-popup.component";
import { BlogService } from '../../../features/blogs/service/blog.service';
import { needConfirmation } from '../../decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-blog-header',
  imports: [DateFormatPipe, RouterLink, ReportModalComponent, SuccessPopupComponent],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.scss',
})
export class BlogHeaderComponent {
  private blogService = inject(BlogService)

  blog = input<blogInterface | null>(null);

  @Output()
  delete = new EventEmitter();

  isVisibleOptions = signal(false)
  isVisibleModalReport = signal(false);
  isVisibleSuccessPopup = signal("");

  showOptions(event: MouseEvent) {
    event.stopPropagation();
    this.isVisibleOptions.update(prev => !prev)
  }

  showReportModal() {
    this.isVisibleModalReport.set(true)
  }

  hideSuccessPopup() {
    this.isVisibleSuccessPopup.set("");
  }

  hideReportModal(message: string) {
    this.isVisibleSuccessPopup.set(message);
    this.isVisibleModalReport.set(false)
  }

  @needConfirmation()
  deleteBlog() {
    this.blogService.submitDeleteBlog(this.blog()?.id!).subscribe(res => {
      this.delete.emit(res.message);
    })
  }

  @HostListener("document:click")
  hideOptions() {
    this.isVisibleOptions.set(false)
  }
}
