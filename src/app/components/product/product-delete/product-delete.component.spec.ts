import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ProductDeleteComponent } from './product-delete.component';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';

describe('ProductDeleteComponent', () => {
  let component: ProductDeleteComponent;
  let fixture: ComponentFixture<ProductDeleteComponent>;
  let productService: ProductService;
  let categoryService: CategoryService;
  let router: Router;

  const product = {
    id: 1,
    name: 'Product 1',
    price: 100,
    user_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  const category = {
    id: 1,
    name: 'Category 1',
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(async () => {
    // product mock
    const productServiceMock = jasmine.createSpyObj('ProductService', ['readById', 'delete', 'showMessage']);

    productServiceMock.readById.and.returnValue(of(product));
    productServiceMock.delete.and.returnValue(of(product));
    productService = productServiceMock;

    // category mock
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['readById']);

    categoryServiceMock.readById.and.returnValue(of(category));
    categoryService = categoryServiceMock;

    // auth mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    authServiceMock.getUser.and.returnValue({ id: 1 });

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    await TestBed.configureTestingModule({
      declarations: [ProductDeleteComponent],
      imports: [HttpClientModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        MatSnackBar,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ProductService, useValue: productServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDeleteComponent);
    component = fixture.componentInstance;
    component.category = { id: 1, name: 'Category 1', created_at: new Date(), updated_at: new Date() } as Category;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on initialization', () => {
    expect(productService.readById).toHaveBeenCalledWith('1');
    expect(component.product).toEqual({
      id: 1,
      name: 'Product 1',
      price: 100,
      user_id: 1,
      category_id: 1,
      created_at: jasmine.any(Date),
      updated_at: jasmine.any(Date)
    });
  });

  it('should delete product', () => {
    component.deleteProduct();
    expect(productService.delete).toHaveBeenCalledWith('1');
    expect(productService.showMessage).toHaveBeenCalledWith('Product deleted!');
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  // check showMessage
  it('should show message', () => {
    productService.showMessage('Product deleted!');
    expect(productService.showMessage).toHaveBeenCalledWith('Product deleted!');
  });

  it('should load category on initialization', () => {
    expect(categoryService.readById).toHaveBeenCalledWith('1');
    expect(component.category).toEqual(category);
  });

  it('should cancel and navigate back to products', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
