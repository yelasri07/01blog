import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { API_URL } from '../../../core/constants/API_URL';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  register(form: FormGroup): Observable<User> {
    return this.http.post<User>(API_URL + "/auth/register", form.value);
  }

  login(form: FormGroup): Observable<User> {
    return this.http.post<User>(API_URL + "/auth/login", form.value);
  }
}
