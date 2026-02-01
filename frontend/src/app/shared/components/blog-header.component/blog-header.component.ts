import { Component, HostListener, input, signal } from '@angular/core';
import { blogInterface } from '../../../features/blogs/interfaces/blog.interface';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { RouterLink } from "@angular/router";
import { ReportModalComponent } from "../report-modal.component/report-modal.component";
import { SuccessPopupComponent } from "../success-popup.component/success-popup.component";

@Component({
  selector: 'app-blog-header',
  imports: [DateFormatPipe, RouterLink, ReportModalComponent, SuccessPopupComponent],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.scss',
})
export class BlogHeaderComponent {
  blog = input<blogInterface | null>(null);

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

  @HostListener("document:click")
  hideOptions() {
    this.isVisibleOptions.set(false)
  }
}
