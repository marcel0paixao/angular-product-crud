import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { CategoryDeleteComponent } from './category-delete.component';
import { CategoryService } from '../category.service';

describe('CategoryDeleteComponent', () => {
  let component: CategoryDeleteComponent;
  let fixture: ComponentFixture<CategoryDeleteComponent>;

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      declarations: [ CategoryDeleteComponent ],
      imports: [ MatSnackBarModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule ],
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
          provide: CategoryService,
          useValue: categoryServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
