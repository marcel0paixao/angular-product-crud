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
});
