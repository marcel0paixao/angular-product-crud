import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { environment } from 'src/environments/environment.development';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10, user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date()},
    { id: 2, name: 'Product 2', price: 20, user_id: 2, category_id: 2, created_at: new Date(), updated_at: new Date()},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MatSnackBar, ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products', () => {
    service.read().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should retrieve a product by id', () => {
    service.readById('1').subscribe((product) => {
      expect(product).toEqual(mockProducts[1]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts[1]);
  });

  it('should create a product', () => {
    service.create(mockProducts[1]).subscribe((product) => {
      expect(product).toEqual(mockProducts[1]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProducts[1]);
  });

  // should update a product
  it('should update a product', () => {
    service.update(mockProducts[1]).subscribe((product) => {
      expect(product).toEqual(mockProducts[1]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/2`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProducts[1]);
  });

  it('should delete a product', () => {
    service.delete('1').subscribe((product) => {
      expect(product).toEqual(mockProducts[1]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProducts[1]);
  });
});
