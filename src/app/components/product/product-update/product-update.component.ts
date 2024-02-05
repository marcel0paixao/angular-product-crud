import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../models/errorMessage';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

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
    }
  };

  initForm(): void {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      price: [null, [Validators.required, Validators.min(1), Validators.maxLength(5)]],
      created_at: [new Date(), [Validators.required]],
      updated_at: [new Date(), [Validators.required]],
      category_id: [3]
    });

    this.productService.readById(this.route.snapshot.paramMap.get('id')!).subscribe(response => {
      this.form.setValue(response)
    })
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
    return !!this.form.get('name')!.errors || !!this.form.get('price')!.errors;
  }

  updateProduct(): void {
    this.productService.update(this.form.value).subscribe(() => {
      this.productService.showMessage("Product updated!")
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
