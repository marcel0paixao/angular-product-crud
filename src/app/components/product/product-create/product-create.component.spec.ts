import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from './product-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let productService: ProductService;
  let router: Router;

  const product = {
    name: 'Products 1',
    price: 100,
    user_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(async () => {
    // product mock
    const productServiceMock = jasmine.createSpyObj('ProductService', ['create', 'showMessage']);
    productServiceMock.create.and.returnValue(of({id: 1, ...product}));
    productService = productServiceMock;

    // auth mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceMock.getUser.and.returnValue({ id: 1 });

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    await TestBed.configureTestingModule({
      declarations: [ ProductCreateComponent ],
      providers: [
        MatSnackBar,
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ProductService,
          useValue: productServiceMock
        }
      ],
      imports: [ HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, BrowserAnimationsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('price')).toBeDefined();
    expect(component.form.get('user_id')).toBeDefined();
    expect(component.form.get('category_id')).toBeDefined();
    expect(component.form.get('created_at')).toBeDefined();
    expect(component.form.get('updated_at')).toBeDefined();
  });

  it('should return the error keys for a control', () => {
    const controlName = 'name';
    const errorKeys = component.getErrorKeys(controlName);
    expect(errorKeys).toEqual(['required']);
  });

  it('should return the error message for a specific error key and control', () => {
    const controlName = 'name';
    const errorKey = 'required';
    const errorMessage = component.getErrorMessage(errorKey, controlName);
    expect(errorMessage).toEqual('The field is required.');
  });

  it('should check if any fields are empty', () => {
    component.form.setValue({
      ...product,
      name: null,
    });
    expect(component.isAnyFieldsEmpty()).toBe(true);

    component.form.setValue({
      ...product,
      price: null,
    });
    expect(component.isAnyFieldsEmpty()).toBe(true);

    component.form.setValue({
      ...product,
      category_id: null,
    });
    expect(component.isAnyFieldsEmpty()).toBe(true);

    component.form.setValue(product);
    expect(component.isAnyFieldsEmpty()).toBe(false);
  });

  it('should create a product', () => {
    component.form.setValue(product);

    Object.defineProperty(component.form, 'valid', {
      get: () => true
    });

    const result = component.createProduct();
    expect(productService.create).toHaveBeenCalled();
    expect(result).toEqual({id: 1, ...product});
    expect(productService.showMessage).toHaveBeenCalledWith('Sucessfully operation!');
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should cancel and navigate back', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should show message', () => {
    productService.showMessage('Product created!');
    expect(productService.showMessage).toHaveBeenCalledWith('Product created!');
  });
});
