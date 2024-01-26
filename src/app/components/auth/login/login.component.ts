// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Login } from '../../models/login';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  template: ''
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  registerForm: boolean = false;

  switchForms() {
    this.registerForm = !this.registerForm;
  }
  
  user: Login = {
    email: '',
    password: ''
  }

  login(): void {
    this.authService.login(this.user).subscribe(
      (response) => {
        this.authService.storeToken(response.token);
      },  
      (error) => {
        console.log(error);
      }
    );
  }
}
