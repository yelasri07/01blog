import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../../../core/services/auth.state.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService)
  private authStateService = inject(AuthStateService)
  private router = inject(Router)

  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  handleSubmit() {
    this.authService.submit(this.form).subscribe(respone => {
      localStorage.setItem('token', respone.token)
      this.authStateService.setCurrentUser(respone)
      this.router.navigateByUrl("/");
    })
  }
}
