import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule

import { ProductUpdateComponent } from './product-update.component';
import { AuthService } from '../../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;

  beforeEach(async () => {
    const authServiceMock = {
      getUser: () => ({ id: '1' })
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductUpdateComponent ],
      imports: [ ReactiveFormsModule, MatSnackBarModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule ], // Include MatInputModule
      providers: [
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
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
