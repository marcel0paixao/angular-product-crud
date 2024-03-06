import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/components/auth/auth.service';
import { CategoryService } from 'src/app/components/category/category.service';
import { ProductService } from 'src/app/components/product/product.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Product } from '../../components/product/product.model';
import { User } from '../../components/models/User';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { Component } from '@angular/core';

@Component({selector: 'app-nav', templateUrl: '../../components/template/nav/nav.component.html'})

class MockAppNav {
  authService: AuthService = TestBed.inject(AuthService);
  title: string = 'app';
  loginDto = null;
  registerDto = null;
  jwtDto = null;
  ngOnInit() {}
  getToken() {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let categoryService: CategoryService;
  let productService: ProductService;
  let router: Router;

  const productMock: Product = {
    id: 1, name: 'Product 1', price: 10,
    user_id: 0,
    category_id: 0,
    created_at: new Date(),
    updated_at: new Date()
  };

  const categoryMock = {
    id: 1,
    name: 'Category 1',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  const UserMock: User = { id: 1, name: 'John Doe', email: 'john@tests.com' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, MockAppNav ],
      imports: [ HttpClientModule, MatSnackBarModule, MatCardModule, RouterTestingModule, MatGridListModule ],
      providers: [ AuthService, ProductService, CategoryService, HeaderService ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    categoryService = TestBed.inject(CategoryService);
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);

    spyOn(authService, 'getToken').and.returnValue('token');
    spyOn(authService, 'getUser').and.returnValue(UserMock);
    spyOn(categoryService, 'read').and.returnValue(of([categoryMock]));
    spyOn(productService, 'read').and.returnValue(of([productMock]));

    authService.storeToken('token');
    authService.storeUser(UserMock);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize gridColsByWindowSize', () => {
    expect(component.gridColsByWindowSize).toEqual({
      500: 1,
      700: 2,
      900: 3,
      1000: 3,
      1200: 4
    });
  });

  it('should initialize token and user', () => {
    expect(component.token).toBe('token');
    expect(component.user).toEqual(UserMock);
  });

  it('should initialize categoriesLength and productsLength', () => {
    expect(component.categoriesLength).toBe(1);
    expect(component.productsLength).toBe(1);
  });

  it('should call categoryService.read() and productService.read() if user is defined', () => {
    expect(categoryService.read).toHaveBeenCalled();
    expect(productService.read).toHaveBeenCalled();
  });

  it('should set the breakpoint on ngOnInit', () => {
    component.ngOnInit();
    expect(component.breakpoint).toBeGreaterThanOrEqual(1);
    expect(component.breakpoint).toBeLessThanOrEqual(4);
  });

  it('should update the breakpoint onResize', () => {
    const event = { target: { innerWidth: 800 } };
    component.onResize(event);
    expect(component.breakpoint).toBe(2);
  });

  it('should navigate to login page on login()', () => {
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to products page on products()', () => {
    spyOn(router, 'navigate');
    component.products();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should navigate to categories page on categories()', () => {
    spyOn(router, 'navigate');
    component.categories();
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should call onResize method on window resize', () => {
    const event = { target: { innerWidth: 800 } };
    const spyOnResize = spyOn(component, 'onResize').and.callThrough();
    spyOnResize.call(component, event);
    fixture.detectChanges();
    expect(spyOnResize).toHaveBeenCalled();
  });

  it('should display cards', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card')).toBeTruthy();
  });
});
