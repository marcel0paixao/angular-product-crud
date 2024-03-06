import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category-read',
  template: ''
})
class MockCategoryReadComponent {}

import { CategoryCrudComponent } from './category-crud.component';

describe('CategoryCrudComponent', () => {
  let component: CategoryCrudComponent;
  let fixture: ComponentFixture<CategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCrudComponent, MockCategoryReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to category create', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.navigateToCategoryCreate();
    expect(navigateSpy).toHaveBeenCalledWith(['/categories/create']);
  });

  it('should set headerData', () => {
    const headerService = (component as any).headerService;
    expect(headerService.headerData).toEqual({
      title: 'Category CRUD',
      icon: 'category',
      routeUrl: '/categories'
    });
  });

  it('should render category-read component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-category-read')).toBeTruthy();
  });
});
