import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../models/errorMessage';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  constructor(private categoryService: CategoryService, private router: Router, private fb: FormBuilder, private readonly authService: AuthService) {}
  
  form!: FormGroup;
  errorMessages: ErrorMessages = {
    name: {
      required: 'The field is required.',
      minlength: 'The field length must be at least 5 characters.',
      maxlength: 'The field length must be maximum of 50 characters.',
      unique: 'Category name has already been taken.'
    }
  };

  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      user_id: this.authService.getUser()!.id,
      created_at: [new Date(), [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  getErrorKeys(controlName: string): string[] {
    return Object.keys(this.form.get(controlName)!.errors || {});
  }

  getErrorMessage(errorKey: string, controlName: string): string {
    return this.errorMessages[controlName][errorKey];
  }

  isAnyFieldsEmpty(): boolean {
    return !!this.form.get('name')!.errors;
  }

  createCategory(): void {
    if (this.form.valid) { 
      this.categoryService.create(this.form.value).subscribe(
        () => {
          this.router.navigate(['/categories'])
          this.categoryService.showMessage('Sucessfully operation!')
        },
        (error) => {
          if(error.error.message == "field must be unique") {
            this.form.get('name')!.setErrors({unique: true});
            return;
          }
          console.log(error)
        }
      )
      return;
    }
  }

  cancel(): void {
    this.router.navigate(['/categories'])
  }
}