import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../models/errorMessage';
import { AuthService } from '../../auth/auth.service';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent {
  constructor(private productService: ProductService, private categoryService: CategoryService, private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  form!: FormGroup;
  errorMessages: ErrorMessages = {
    name: {
      required: 'The field is required.',
      minlength: 'The field length must be at least 10 characters.',
      maxlength: 'The field length must be maximum of 50 characters.'
    },
    price: {
      required: 'The field is required.',
      min: 'The field cannot be less than 1.'
    },
    category_id: {
      required: 'The field is required.'
    }
  };

  categories: {
    value: number,
    label: string
  }[] = [];

  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      price: [null, [Validators.required, Validators.min(1), Validators.maxLength(5)]],
      created_at: [new Date(), [Validators.required]],
      user_id: this.authService.getUser()!.id,
      category_id: [null, [Validators.required]]
    });

    this.categoryService.read().subscribe(
      (categories) => {
        categories.map((category: Category) => this.categories!.push({value: category.id, label: category.name}))
      }
    )
  }

  ngOnInit(): void {
    this.initForm();;
  }

  getErrorKeys(controlName: string): string[] {
    return Object.keys(this.form.get(controlName)!.errors || {});
  }

  getErrorMessage(errorKey: string, controlName: string): string {
    return this.errorMessages[controlName][errorKey];
  }

  isAnyFieldsEmpty(): boolean {
    return !!this.form.get('name')!.errors || !!this.form.get('price')!.errors;
  }

  createProduct(): void {
    console.log(this.form.value);
    
    if (this.form.valid) { 
      this.productService.create(this.form.value).subscribe(
        () => {
          this.router.navigate(['/products'])
          this.productService.showMessage('Sucessfully operation!')
        },
        (error) => console.log(error)
      )
      return;
    }
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
