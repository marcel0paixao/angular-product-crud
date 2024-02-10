import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateComponent } from './category-create.component';
import { describe, beforeEach, it } from 'node:test';

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCreateComponent ]
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
