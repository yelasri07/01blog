import { Injectable, signal } from '@angular/core';
import { User } from '../../features/user/model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private currentUser = signal<User | undefined | null>(undefined);

  getCurrentUser() {
    return this.currentUser();
  }

  setCurrentUser(currentUser: User | undefined | null) {
    this.currentUser.set(currentUser)
  }
}
