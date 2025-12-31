import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService)
  private authStateService = inject(AuthStateService)
  private router = inject(Router)

  registerForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^\w+$/)]
    }),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  handleSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return;
    }

    this.authService.submit(this.registerForm).subscribe({
      next: respone => {
        localStorage.setItem('token', respone.token)
        this.authStateService.setCurrentUser(respone)
        this.router.navigateByUrl("/");
      },

      error: err => {
        console.error(err)
      }
    })
  }

  getUsername() {
    return this.registerForm.controls.username;
  }
}
