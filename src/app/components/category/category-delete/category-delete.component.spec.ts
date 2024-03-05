import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { CategoryDeleteComponent } from './category-delete.component';
import { CategoryService } from '../category.service';
import { of } from 'rxjs';

describe('CategoryDeleteComponent', () => {
  let component: CategoryDeleteComponent;
  let fixture: ComponentFixture<CategoryDeleteComponent>;
  let categoryService: CategoryService;
  let router: Router;

  const category = {
    id: 1,
    name: 'Category Name',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };
  
  beforeEach(async () => {
    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;
 
    // category mock
    const categoryServiceMock = jasmine.createSpyObj('CategoryService', ['delete', 'readById', 'showMessage']);
    categoryServiceMock.readById.and.returnValue(of(category));
    categoryServiceMock.delete.and.returnValue(of({category}));
    categoryService = categoryServiceMock;

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
        },
        {
          provide: Router,
          useValue: routerMock
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDeleteComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load category on initialization', () => {
    expect(categoryService.readById).toHaveBeenCalledWith('1');
    expect(component.category).toEqual(category);
  });

  it('should delete category', () => {
    component.deleteCategory();
    expect(categoryService.delete).toHaveBeenCalledWith('1');
    expect(categoryService.showMessage).toHaveBeenCalledWith('Category deleted!');
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should show message', () => {
    categoryService.showMessage('Product deleted!');
    expect(categoryService.showMessage).toHaveBeenCalledWith('Product deleted!');
  });

  it('should cancel and navigate back', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/categories']);
  });
});
