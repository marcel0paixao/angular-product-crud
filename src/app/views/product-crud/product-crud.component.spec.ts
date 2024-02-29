import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-read',
  template: '<p>Product Read Component</p>'
})
class ProductReadComponent {}

import { ProductCrudComponent } from './product-crud.component';

describe('ProductCrudComponent', () => {
  let component: ProductCrudComponent;
  let fixture: ComponentFixture<ProductCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCrudComponent, ProductReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
