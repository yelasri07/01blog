import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth.state.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService)
  const router = inject(Router)

  if (authStateService.getCurrentUser()?.role === "ADMIN") {
    return true
  }

  router.navigateByUrl("/");
  return false
};
