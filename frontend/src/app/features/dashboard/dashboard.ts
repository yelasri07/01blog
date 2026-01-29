import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header.component/header.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, HeaderComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
