import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth.state.service';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService)
  const router = inject(Router)

  if (authStateService.getCurrentUser() == undefined) {
    return false;
  }

  if (!authStateService.isAuthenticated()) {
    router.navigateByUrl("/auth/login");
    return false;
  }

  return true;
};
