import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CategoryUpdateComponent } from './category-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../auth/auth.service';
import { CategoryService } from '../category.service';
import { of } from 'rxjs';
import { Category } from '../category.model';

describe('CategoryUpdateComponent', () => {
  let component: CategoryUpdateComponent;
  let fixture: ComponentFixture<CategoryUpdateComponent>;
  let categoryService: CategoryService;
  let authService: AuthService;
  let router: Router;

  const category: Category = {
    id: 1,
    name: 'Category 1',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  const updatedCategory: Category = {
    id: 1,
    name: 'Category 1 updated',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(async () => {
    // auth service mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceMock.getUser.and.returnValue({ id: 1 });
    authService = authServiceMock;

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    // category service mock
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['readById', 'update', 'showMessage']);
    categoryServiceMock.readById.and.returnValue(of(category));
    categoryServiceMock.update.and.returnValue(of(updatedCategory));
    categoryService = categoryServiceMock;

    await TestBed.configureTestingModule({
      declarations: [ CategoryUpdateComponent ],
      providers: [
        MatSnackBar,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with category data', () => {
    expect(component.form.value).toEqual(category);
  });

  it('should return the error keys for a control', () => {
    const controlName = 'name';
    component.form.setValue({ ...category, name: null });
    const errorKeys = component.getErrorKeys(controlName);
    expect(errorKeys).toEqual(['required']);
  });

  it('should return the error message for a control and error key', () => {
    const controlName = 'name';
    const errorKey = 'required';
    const errorMessage = component.getErrorMessage(errorKey, controlName);
    expect(errorMessage).toBe('The field is required.');
  });

  it('should check if any fields are empty', () => {
    component.form.patchValue({ ...category, name: null });
    expect(component.isAnyFieldsEmpty()).toBe(true);

    component.form.patchValue(category);
    expect(component.isAnyFieldsEmpty()).toBe(false);
  });

  it('should update the category', () => {
    component.form.setValue(updatedCategory);
    spyOn(window, 'confirm').and.returnValue(true);
    const result = component.updateCategory();
    expect(result).toBe(updatedCategory);
    expect(categoryService.update).toHaveBeenCalledWith(updatedCategory);
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should cancel and navigate back to category', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });
});
