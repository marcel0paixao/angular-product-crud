import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Product } from './product.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient, private readonly router: Router) {}
  baseurl = environment.apiUrl + '/products';

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseurl, product).pipe(
      map(obj => obj),
      // catchError(this.errorHandler)
    )
  }

  errorHandler(e: any): Observable<any> {
    // this.showMessage('Occurred an error!', true)
    console.log(e)
    return EMPTY
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl)
  }

  readById(id: string): Observable<Product>{
    const url = `${this.baseurl}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseurl}/${product.id}`
    return this.http.patch<Product>(url, product)
  }

  delete(id: string): Observable<Product>{
    const url = `${this.baseurl}/${id}`
    return this.http.delete<Product>(url)
  }
}
