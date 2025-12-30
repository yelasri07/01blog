import { Component, inject, signal } from '@angular/core';
import { AuthStateService } from '../../../../core/services/auth.state.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  authStateService = inject(AuthStateService)
  username = signal(this.authStateService.getCurrentUser()?.username)
}
