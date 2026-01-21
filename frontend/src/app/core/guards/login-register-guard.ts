import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth.state.service';

export const loginRegisterGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  if (authStateService.isAuthenticated()) {
    router.navigateByUrl('/');
    return false
  }
  
  return true;
};

