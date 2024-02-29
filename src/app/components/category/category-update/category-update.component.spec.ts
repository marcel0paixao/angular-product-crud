import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CategoryUpdateComponent } from './category-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../auth/auth.service';

describe('CategoryUpdateComponent', () => {
  let component: CategoryUpdateComponent;
  let fixture: ComponentFixture<CategoryUpdateComponent>;

  beforeEach(async () => {
    const authServiceMock = {
      getUser: () => ({ id: '1' })
    };

    await TestBed.configureTestingModule({
      declarations: [ CategoryUpdateComponent ],
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
      imports: [
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
