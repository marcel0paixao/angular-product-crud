// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../models/errorMessage';
import { HeaderService } from '../../template/header/header.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  template: ''
})
export class LoginComponent {
  constructor(private authService: AuthService, private fb: FormBuilder, private headerService: HeaderService, private router: Router) {
    headerService.headerData = {
      title: 'Login',
      icon: 'login',
      routeUrl: '/login'
    }
  }

  form!: FormGroup;
  errorMessages: ErrorMessages = {
    email: {
      email: 'Invalid email format.',
      required: 'This field is required.'
    },
    password: {
      required: 'This field is required.'
    },
  };
  invalidLogin: boolean = false;
  
  ngOnInit(): void {
    this.initForm();
    if (this.getToken()) this.redirectHome();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getErrorKeys(controlName: string): string[] {
    return Object.keys(this.form.get(controlName)!.errors || {});
  }

  getErrorMessage(errorKey: string, controlName: string): string {
    return this.errorMessages[controlName][errorKey]
  }

  registerForm: boolean = false;

  switchForms() {
    this.registerForm = !this.registerForm;
    if (this.registerForm) {
      this.router.navigate(['/register'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  getToken(): string | null {
    return this.authService.getToken();
  }

  redirectHome(): void {
    this.router.navigate(['/'])
  }

  login(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (response) => {
          this.authService.storeToken(response.access_token);
          this.authService.storeUser(response.user);
          this.router.navigate(['/']);
        },  
        (error) => {
          if (error.error.message == "Email address or password provided is incorrect.") this.invalidLogin = true;
          console.log(error);
        }
      );
    }
  }
}
