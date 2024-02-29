import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ProductDeleteComponent } from './product-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';

describe('ProductDeleteComponent', () => {
  let component: ProductDeleteComponent;
  let fixture: ComponentFixture<ProductDeleteComponent>;

  beforeEach(async () => {
    const productServiceMock = {
      readById: () => ({
        subscribe: () => ({
          id: 1,
          name: 'Product 1',
          price: 100,
          user_id: 1,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        })
      })
    };

    const categoryServiceMock = {
      readById: () => ({
        subscribe: () => ({
          id: 1,
          name: 'Category 1',
          created_at: new Date(),
          updated_at: new Date()
        })
      })
    };

    const authServiceMock = {
      getUser: () => ({ id: 1 })
    };

    await TestBed.configureTestingModule({
      declarations: [ProductDeleteComponent],
      imports: [HttpClientModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
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
          provide: ProductService,
          useValue: productServiceMock
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: CategoryService,
          useValue: categoryServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDeleteComponent);
    component = fixture.componentInstance;
    component.category = { id: 1, name: 'Category 1', created_at: new Date(), updated_at: new Date() } as Category;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
