import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeMessageComponent } from "../../components/welcome-message.component/welcome-message.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, WelcomeMessageComponent, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService)

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  handleSubmit() {
    
  }

  get username() {
    return this.loginForm.controls.username
  }

  get password() {
    return this.loginForm.controls.password
  }
}
