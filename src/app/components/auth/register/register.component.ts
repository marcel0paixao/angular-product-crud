import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorMessages } from '../../models/errorMessage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  form!: FormGroup;
  errorMessages: ErrorMessages = {
    name: {
      required: 'The field is required.',
      minlength: 'The field length must be at least 10 characters.',
      maxlength: 'The field length must be maximum of 50 characters.'
    },
    email: {
      required: 'The field is required.',
      email: 'The field must be a valid email.',
      maxlength: 'The field length must be maximum of 50 characters.'
    },
    password: {
      required: 'The field is required.',
      minlength: 'The field length must be at least 7 characters.',
      maxlength: 'The field length must be maximum of 20 characters.',
      pattern: 'The password is too weak.'
    },
  };
  
  successModal: boolean = false;
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [
        '', 
        {
          validators: [
            Validators.required, 
            Validators.maxLength(20), 
            Validators.minLength(7), 
            Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)],
        },
      ],
    });
  }

  getErrorKeys(controlName: string): string[] {
    return Object.keys(this.form.get(controlName)!.errors || {});
  }

  getErrorMessage(errorKey: string, controlName: string): string {
    return this.errorMessages[controlName][errorKey];
  }

  isAnyFieldsEmpty(): boolean {
    return !!this.form.get('name')!.errors || !!this.form.get('email')!.errors || !!this.form.get('password')!.errors;
  }

  getPasswordValidation(): { [key: string]: boolean } {
    return {
      specialChars: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(this.form.get('password')!.value),
      lowerCase: /[a-z]/.test(this.form.get('password')!.value),
      upperCase: /[A-Z]/.test(this.form.get('password')!.value),
      minlength: this.form.get('password')!.hasError('minlength') || this.form.get('password')!.hasError('required'),
    }
  }

  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe(
        (response) => {
          if (!response) return;

          this.authService.login(this.form.value).subscribe(
            (response) => {
              return this.authService.storeToken(response.access_token);
            },  
            (error) => {
              console.log(error);
            }
          );
        },  
        (error) => {
          console.log(error);
        },
        () => {
          this.successModal = true;
        }
      )
    }
  }
}
