import { Directive, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appIntersectionobserver]',
})
export class IntersectionobserverDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | undefined;
  hasInitialised: boolean = false;

  @Output()
  isIntersecting: EventEmitter<boolean> = new EventEmitter(false);

  ngOnInit(): void {
    this.watchElementForEntry()
  }

  ngOnDestroy(): void {
    this.observer?.disconnect()
  }

  private watchElementForEntry() {
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!this.hasInitialised) {
          this.hasInitialised = true
          continue
        }

        this.isIntersecting.emit(entry.isIntersecting)
      }
    })

    this.observer.observe(this.el.nativeElement)
  }

}
