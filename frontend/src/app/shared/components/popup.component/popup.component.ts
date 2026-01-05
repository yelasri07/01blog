import { Component, input } from '@angular/core';
import { popupInterface } from '../../interfaces/popup.interface';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  popup = input<popupInterface | null>(null);
}
