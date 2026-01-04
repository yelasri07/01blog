import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WelcomeMessageComponent } from "../../components/welcome-message.component/welcome-message.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, WelcomeMessageComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
