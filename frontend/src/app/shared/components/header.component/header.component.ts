import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth.state.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private authStateService = inject(AuthStateService)
  showDropdown = signal(false);
  userInfos = signal(this.authStateService.getCurrentUser())

  logout() {
    this.authStateService.setCurrentUser(null)
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login')
  }

  dropdownProfile() {
    this.showDropdown.update(prev => !prev)
  }

}
