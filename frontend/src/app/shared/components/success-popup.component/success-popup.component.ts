import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  imports: [],
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.scss',
})
export class SuccessPopupComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>()

  message = input.required<string>();
  delay = input(3000)

  ngOnInit(): void {
    setTimeout(() => {
      this.close.emit();
    }, this.delay())
  }
}
