import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../../../core/services/auth.state.service';
import { NgClass } from '@angular/common';
import { WelcomeMessageComponent } from '../../components/welcome-message.component/welcome-message.component';

const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirmation
    ? null
    : { PasswordNoMatch: true };
};

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgClass, WelcomeMessageComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService)
  private authStateService = inject(AuthStateService)
  private router = inject(Router)

  showPopup = signal(false);

  registerForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^\w+$/)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)]
    }),
    confirmation: new FormControl('')
  },
    {
      validators: confirmPasswordValidator
    }
  )

  handleSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return;
    }

    this.authService.register(this.registerForm).subscribe({
      next: respone => {
        localStorage.setItem('token', respone.token || "")
        this.authStateService.setCurrentUser(respone)
        this.router.navigateByUrl("/");
      },

      error: err => {
        if (err.error && (err.status === 400 || err.status === 409)) {
          Object.keys(err.error).forEach(key => {
            const control = this.registerForm.get(key)
            if (control) {
              control.setErrors({
                'backend': err.error[key]
              })
            }
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
    return this.registerForm.controls.username;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmation() {
    return this.registerForm.controls.confirmation;
  }
}
