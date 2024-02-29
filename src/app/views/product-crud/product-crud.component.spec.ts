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

  it('should navigate to product create', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.navigateToProductCreate();
    expect(navigateSpy).toHaveBeenCalledWith(['/products/create']);
  });

  it('should set headerData', () => {
    const headerService = (component as any).headerService;
    expect(headerService.headerData).toEqual({
      title: 'Product CRUD',
      icon: 'storefront',
      routeUrl: '/products'
    });
  });

  it('should render product-read component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-product-read')).toBeTruthy();
  });
});
