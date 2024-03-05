import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryCreateComponent } from './category-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { of } from 'rxjs';

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;
  let router: Router;
  let categoryService: CategoryService;
  
  const category = {
    name: 'Category Name',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };
  
  beforeEach(async () => {
    // auth mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceMock.getUser.and.returnValue({ id: 1 });

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    // category mock
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['create', 'showMessage']);
    categoryServiceMock.create.and.returnValue(of({id: 1, ...category}));
    categoryService = categoryServiceMock;

    await TestBed.configureTestingModule({
      declarations: [ CategoryCreateComponent ],
      providers: [
        MatSnackBar,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: CategoryService,
          useValue: categoryServiceMock
        }
      ],
      imports: [HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
  });

  it('should return the error keys for a control', () => {
    const controlName = 'name';
    component.form.setValue({...category, name: null});
    const errorKeys = component.getErrorKeys(controlName);
    expect(errorKeys).toEqual(['required']);
  });

  it('should return the error message for a specific error key and control', () => {
    const controlName = 'name';
    const errorKey = 'required';
    const errorMessage = component.getErrorMessage(errorKey, controlName);
    expect(errorMessage).toBe('The field is required.');
  });

  it('should check if any fields are empty', () => {
    // Set form values to empty values
    component.form.setValue({ ...category, name: null });
    expect(component.isAnyFieldsEmpty()).toBe(true);
  });

  it('should create a category', () => {
    component.form.setValue(category);

    Object.defineProperty(component.form, 'valid', {
      get: () => true
    });

    const result = component.createCategory();
    expect(categoryService.create).toHaveBeenCalled();
    expect(result).toEqual({id: 1, ...category});
    expect(categoryService.showMessage).toHaveBeenCalledWith('Sucessfully operation!');
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should cancel and navigate back', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });
});
