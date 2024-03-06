import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CategoryService } from './category.service';
import { Category } from './category.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const mockCategories: Category[] = [
    { id: 1, name: 'Category 1', user_id: 1, created_at: new Date(), updated_at: new Date() },
    { id: 2, name: 'Category 2', user_id: 1, created_at: new Date(), updated_at: new Date() },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatSnackBar],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve categories', () => {
    service.read().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${service.baseurl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should retrieve a category by id', () => {
    service.readById('1').subscribe((category) => {
      expect(category).toEqual(mockCategories[1]);
    });

    const req = httpMock.expectOne(`${service.baseurl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories[1]);
  });

  it('should create a category', () => {
    service.create(mockCategories[1]).subscribe((category) => {
      expect(category).toEqual(mockCategories[1]);
    });

    const req = httpMock.expectOne(`${service.baseurl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCategories[1]);
  });

  it('should update a category', () => {
    service.update(mockCategories[1]).subscribe((category) => {
      expect(category).toEqual(mockCategories[1]);
    });

    const req = httpMock.expectOne(`${service.baseurl}/2`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockCategories[1]);
  });

  it('should delete a category', () => {
    service.delete('1').subscribe((category) => {
      expect(category).toEqual(mockCategories[1]);
    });

    const req = httpMock.expectOne(`${service.baseurl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockCategories[1]);
  });
});
