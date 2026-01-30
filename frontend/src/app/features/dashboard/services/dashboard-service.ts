import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/API_URL';
import { User } from '../../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(API_URL + "/users");
  }

  submitBan(userId: number) {
    return this.http.put(API_URL + `/users/${userId}/ban`, {})
  }

  submitDelete(userId: number) {
    return this.http.delete(API_URL + `/users/${userId}`)
  }

}
