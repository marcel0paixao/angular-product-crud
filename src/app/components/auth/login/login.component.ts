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

  NgOnInit() {
    if (!!this.authService.getToken()) this.router.navigate(['home'])
  }

  form!: FormGroup;
  errorMessages: ErrorMessages = {
    email: {
      email: 'Invalid email format.',
      required: 'This field is required.',
      maxlength: 'The field length must be maximum of {{ max_length }} characters.'
    },
    password: {
      required: 'This field is required.',
      maxlength: 'The field length must be maximum of {{ max_length }} characters.'
    },
  };
  
  ngOnInit(): void {
    this.initForm();
    if (this.getToken()) this.redirectHome();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
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
    this.router.navigate(['/products'])
  }

  login(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (response) => {
          this.authService.storeToken(response.access_token);
          this.authService.storeUser(response.user);
          this.router.navigate(['/home']);
        },  
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
