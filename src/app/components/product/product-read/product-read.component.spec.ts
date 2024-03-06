import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { ProductReadComponent } from './product-read.component';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

describe('ProductReadComponent', () => {
  let component: ProductReadComponent;
  let fixture: ComponentFixture<ProductReadComponent>;
  let productService: ProductService;

  const products: Product[] = [
    {
      id: 1,
      name: 'Products 1',
      price: 100,
      user_id: 1,
      category_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Products 2',
      price: 200,
      user_id: 1,
      category_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  beforeEach(waitForAsync(() => {
    // product mock
    const productServiceMock = jasmine.createSpyObj('ProductService', ['read']);
    productServiceMock.read.and.returnValue(products);
    productService = productServiceMock;

    TestBed.configureTestingModule({
      declarations: [ ProductReadComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatSnackBarModule,
        HttpClientModule,
      ],
      providers: [ProductService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReadComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    spyOn(productService, 'read').and.returnValue(of(products));

    component.ngOnInit();

    expect(component.products).toEqual(products);
  });
});
