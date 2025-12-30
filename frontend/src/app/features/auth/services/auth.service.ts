import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../user/model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  submit(form: FormGroup): Observable<User> {
    return this.http.post<User>("http://localhost:8080/api/auth/register", form.value);
  }
}
