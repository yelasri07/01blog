import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../features/user/model/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/API_URL';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private currentUser = signal<User | undefined | null>(undefined);
  private http = inject(HttpClient);

  findCurrentUser(): Observable<User> {
    return this.http.get<User>(API_URL + "/users/me");
  }

  getCurrentUser() {
    return this.currentUser();
  }

  setCurrentUser(currentUser: User | undefined | null) {
    this.currentUser.set(currentUser)
  }
}
