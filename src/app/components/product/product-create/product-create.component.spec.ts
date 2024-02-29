import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from './product-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  beforeEach(async () => {
    const authServiceMock = {
      getUser: () => ({ id: 1 })
    };
    await TestBed.configureTestingModule({
      declarations: [ ProductCreateComponent ],
      providers: [
        MatSnackBar,
        {
          provide: AuthService,
          useValue: authServiceMock
        },
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
});
