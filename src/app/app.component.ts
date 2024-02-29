import { Component } from '@angular/core';
import { Login } from './components/models/login';
import { Register } from './components/models/register';
import { JwtAuth } from './components/models/jwtAuth';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CRUD';
  loginDto: Login | null = null;
  registerDto: Register | null = null;
  jwtDto: JwtAuth | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    document.body.title = this.title;
  }

  getToken(): string | null {
    return this.authService.getToken();
  }
}
