import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header.component/header.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, RouterLinkWithHref, RouterLinkActive, NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver)
  private breakpointSubscription!: Subscription;

  showNavBar = signal(true);

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver.observe("(max-width:560px)").subscribe(res => {
      this.showNavBar.set(!res.matches)
    })
  }

  ngOnDestroy(): void {
    if (this.breakpointSubscription) this.breakpointSubscription.unsubscribe();
  }

}
