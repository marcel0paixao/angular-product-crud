
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages } from '../../models/errorMessage';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {
  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  form!: FormGroup;
  errorMessages: ErrorMessages = {
    name: {
      required: 'The field is required.',
      minlength: 'The field length must be at least 5 characters.',
      maxlength: 'The field length must be maximum of 50 characters.'
    }
  };

  initForm(): void {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      created_at: [new Date(), [Validators.required]],
      updated_at: [new Date(), [Validators.required]]
    });

    this.categoryService.readById(this.route.snapshot.paramMap.get('id')!).subscribe(response => {
      this.form.setValue(response);
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
    return !!this.form.get('name')!.errors;
  }

  updateCategory(): void {
    this.categoryService.update(this.form.value).subscribe(() => {
      this.categoryService.showMessage("Category updated!")
      this.router.navigate(["/categories"])
    })
  }

  cancel(): void {
    this.router.navigate(['/categories'])
  }
}