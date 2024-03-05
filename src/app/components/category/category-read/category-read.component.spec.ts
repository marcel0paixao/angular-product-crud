import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router'; // Add this import

import { CategoryReadComponent } from './category-read.component';
import { of } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

describe('CategoryReadComponent', () => {
  let component: CategoryReadComponent;
  let fixture: ComponentFixture<CategoryReadComponent>;
  let categoryService: CategoryService;
  let router: Router;

  const categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Category 2',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  beforeEach(() => {
    // category mock
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['read']);
    categoryServiceMock.read.and.returnValue(of(categories));
    categoryService = categoryServiceMock;

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    TestBed.configureTestingModule({
      declarations: [ CategoryReadComponent ],
      providers: [ 
        MatSnackBar, 
        {
          provide: CategoryService,
          useValue: categoryServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ],
      imports: [ HttpClientModule, MatFormFieldModule, MatTableModule, RouterModule ] // Add RouterModule here
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories on initialization', () => {
    component.ngOnInit();

    expect(component.categories).toEqual(categories);
  });
});
