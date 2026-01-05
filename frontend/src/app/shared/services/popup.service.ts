import { Injectable } from '@angular/core';
import { popupInterface } from '../interfaces/popup.interface';

@Injectable({
  providedIn: 'root',
})

// to use popup you should check "timer" is null
export class PopupService {
  timer: NodeJS.Timeout | null = null;

  popup: popupInterface = {
    message: '',
    isValid: false,
    delay: 3000
  }
}
