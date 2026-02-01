import { Component, ElementRef, EventEmitter, inject, input, Input, Output, signal, ViewChild } from '@angular/core';
import { needConfirmation } from '../../decorators/confirm-dialog.decorator';
import { ReportService } from '../../../core/services/report.service';

@Component({
  selector: 'app-report-modal',
  imports: [],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.scss',
})
export class ReportModalComponent {
  private reportService = inject(ReportService);

  @Output()
  close = new EventEmitter<string>();
  @ViewChild('textarea')
  textarea: ElementRef<HTMLTextAreaElement> | undefined;

  targetId = input.required<number>();
  reportType = input.required<"USER" | "BLOG">();
  modalTitle = input.required<string>()
  showReasonError = signal("");

  closeModal() {
    this.close.emit("");
  }

  @needConfirmation()
  handleSubmitReport() {
    const reason = this.textarea?.nativeElement.value ?? ""

    this.reportService.submitReport(reason, 55, this.reportType()).subscribe({
      next: res => {
        this.close.emit(res.message);
      },
      error: err => {
        if (err?.error?.reason) {
          this.showReasonError.set(err.error.reason)
        } else {
          throw err
        }
      }
    })
  }
}
