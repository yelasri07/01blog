import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStateService } from '../services/auth.state.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router)
  const authStateService = inject(AuthStateService)

  req = req.clone({
    setHeaders: {
      'Authorization': 'Bearer ' + token
    }
  })

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        authStateService.setCurrentUser(null)
        localStorage.removeItem('token')
        router.navigateByUrl('/auth/login')
      }
      return throwError(() => err)
    })
  );
};
