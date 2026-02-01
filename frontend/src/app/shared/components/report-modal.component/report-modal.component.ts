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

  closeModal() {
    this.close.emit("");
  }

  @needConfirmation()
  handleSubmitReport() {
    this.reportService.submitReport(this.textarea?.nativeElement.value ?? "", this.targetId(), this.reportType()).subscribe({
      next: res => {
        this.close.emit(res.message);
      },
      error: err => {
        console.error(err)
      }
    })
  }
}
