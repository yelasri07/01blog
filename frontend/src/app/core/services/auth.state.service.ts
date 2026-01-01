import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/API_URL';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private currentUser = signal<User | undefined | null>(undefined);
  private http = inject(HttpClient);

  loadCurrentUser() {
    return this.http.get<User>(API_URL + '/users/me').pipe(
      tap(respone => {
        this.currentUser.set(respone)
      }),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null ;
  }

  getCurrentUser() {
    return this.currentUser();
  }

  setCurrentUser(currentUser: User | undefined | null) {
    this.currentUser.set(currentUser)
  }
}
