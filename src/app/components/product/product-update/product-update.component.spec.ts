import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ProductUpdateComponent } from './product-update.component';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let productService: ProductService;
  let authService: AuthService;
  let router: Router;

  const product: Product = {
    id: 1,
    name: 'Products 1',
    price: 100,
    user_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };
  const updatedProduct: Product = {
    id: 1,
    name: 'Products 1 updated',
    price: 200,
    user_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(async () => {
    // product mock
    const productServiceMock = jasmine.createSpyObj('ProductService', ['readById', 'update', 'showMessage']);
    productServiceMock.readById.and.returnValue(of(product));
    productServiceMock.update.and.returnValue(of(updatedProduct));
    productService = productServiceMock;

    // auth mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceMock.getUser.and.returnValue({ id: 1 });
    authService = authServiceMock;

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    await TestBed.configureTestingModule({
      declarations: [ ProductUpdateComponent ],
      imports: [ ReactiveFormsModule, MatSnackBarModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with product data', () => {
    expect(component.form.value).toEqual(product);
  });

  it('should return the error keys for a control', () => {
    const controlName = 'name';
    component.form.setValue({ ...product, name: null });
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
    component.form.patchValue({ ...product, name: null });
    expect(component.isAnyFieldsEmpty()).toBe(true);

    component.form.patchValue(product);
    expect(component.isAnyFieldsEmpty()).toBe(false);
  });

  it('should update the product', () => {
    component.form.setValue(updatedProduct);
    spyOn(window, 'confirm').and.returnValue(true);
    const result = component.updateProduct();
    expect(result).toBe(updatedProduct);
    expect(productService.update).toHaveBeenCalledWith(updatedProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should cancel and navigate back to products', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
