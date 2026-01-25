import { Component, model, OnInit } from '@angular/core';
import { popupInterface } from '../../interfaces/popup.interface';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class Popup2Component implements OnInit {
  popup = model.required<popupInterface>();

  ngOnInit(): void {
    setTimeout(() => {
      this.popup.update(prev => ({
        ...prev,
        show: false
      }))
    }, 4000)
  }
}
