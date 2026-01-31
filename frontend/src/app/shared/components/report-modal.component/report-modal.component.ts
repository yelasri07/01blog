import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { needConfirmation } from '../../decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-report-modal',
  imports: [],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.scss',
})
export class ReportModalComponent {
  @Output()
  close = new EventEmitter<void>();
  @Output()
  submit = new EventEmitter<string>();

  @ViewChild('textarea')
  textarea: ElementRef<HTMLTextAreaElement> | undefined;

  closeModal() {
    this.close.emit();
  }

  submitReport() {
    this.submit.emit(this.textarea?.nativeElement.value)
  }
}
