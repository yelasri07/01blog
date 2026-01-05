import { Injectable } from '@angular/core';
import { popupInterface } from '../interfaces/popup.interface';

@Injectable({
  providedIn: 'root',
})

// to use popup you should check "timer" is null

//exemple usage:
// private popupService = inject(PopupService)
// popup = signal(this.popupService.popup);
// showPopup = signal(false);

// if (!this.popupService.timer) {
//   this.showPopup.set(true)
//   this.popup.update(p => ({
//     ...p,
//     message: 'Ooops! something wrong',
//     isValid: false,
//   }))
//   this.popupService.timer = setTimeout(() => {
//     this.showPopup.set(false)
//     this.popupService.timer = null
//   }, this.popup().delay)
// }

export class PopupService {
  timer: NodeJS.Timeout | null = null;

  popup: popupInterface = {
    message: '',
    isValid: false,
    delay: 3000
  }
}
