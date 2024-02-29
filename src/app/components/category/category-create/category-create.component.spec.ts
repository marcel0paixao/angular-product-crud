import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { CategoryCreateComponent } from './category-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;

  beforeEach(async () => {
    const authServiceMock = {
      getUser: () => ({ id: '1' })
    };

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
        }
      ],
      imports: [HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, BrowserAnimationsModule] // Add ReactiveFormsModule here
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
