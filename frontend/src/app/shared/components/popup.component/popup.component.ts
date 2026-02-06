import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { popupInterface } from '../../interfaces/popup.interface';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class Popup2Component implements OnInit, OnDestroy {
  popup = model.required<popupInterface>();
  timer: NodeJS.Timeout | undefined

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.popup.update(prev => ({
        ...prev,
        show: false
      }))
    }, 4000)
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer)
  }
}
