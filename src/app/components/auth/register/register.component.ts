import { Component } from '@angular/core';
import { Register } from '../../models/register';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
  }

  user: Register = {
    name: '',
    email: '',
    password: ''
  }

register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.authService.storeToken(response.token);
      },  
      (error) => {
        console.log(error);
      }
    );
  }
}
