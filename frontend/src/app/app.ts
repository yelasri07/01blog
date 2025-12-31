import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStateService } from './core/services/auth.state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  private authStateService = inject(AuthStateService)

  ngOnInit(): void {
    this.authStateService.findCurrentUser().subscribe({
      next: respone => {
        this.authStateService.setCurrentUser(respone)
        console.log(this.authStateService.getCurrentUser())
      },

      error: err => {
        console.error(err);
      }
    })
  }                                                                                                    
}
