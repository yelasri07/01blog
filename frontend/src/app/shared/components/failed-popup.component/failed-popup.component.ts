import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-failed-popup',
  imports: [],
  templateUrl: './failed-popup.component.html',
  styleUrl: './failed-popup.component.scss',
})
export class FailedPopupComponent {
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
