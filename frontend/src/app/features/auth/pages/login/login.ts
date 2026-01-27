import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WelcomeMessageComponent } from "../../components/welcome-message.component/welcome-message.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, WelcomeMessageComponent, ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService)
  private authStateService = inject(AuthStateService)
  private router = inject(Router)

  showPopup = signal(false);

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', Validators.required)
  })

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return;
    }

    this.authService.login(this.loginForm).subscribe({
      next: respone => {
        localStorage.setItem('token', respone.token || "")
        this.authStateService.setCurrentUser(respone)
        this.router.navigateByUrl('/')
      },

      error: err => {
        if (err.status === 401) {
          this.loginForm.setErrors({
            'backend': err.error.detail
          })
        } else {
          // if (!this.popupService.timer) {
          //   this.showPopup.set(true)
          //   this.popup.update(p => ({
          //     ...p,
          //     message: 'Ooops! something wrong',
          //     isValid: false,
          //   }))
          //   this.popupService.timer = setTimeout(() => {
          //     this.showPopup.set(false)
          //     this.popupService.timer = null
          //   }, this.popup().delay)
          // }
        }
      }
    })
  }

  get username() {
    return this.loginForm.controls.username
  }

  get password() {
    return this.loginForm.controls.password
  }
}
