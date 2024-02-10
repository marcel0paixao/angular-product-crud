import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Category } from './category.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient, private readonly router: Router) {}

  baseurl = environment.apiUrl + '/categories';

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Category): Observable<Category> {
    return this.http.post<Category>(this.baseurl, product).pipe(
      map(obj => obj),
      catchError(this.errorHandler)
    )
  }

  errorHandler(e: any): Observable<any> {
    // this.showMessage('Occurred an error!', true)
    console.log(e)
    return EMPTY;
  }

  read(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseurl)
  }

  readById(id: string): Observable<Category>{
    const url = `${this.baseurl}/${id}`
    return this.http.get<Category>(url)
  }

  update(product: Category): Observable<Category>{
    const url = `${this.baseurl}/${product.id}`
    return this.http.patch<Category>(url, product)
  }

  delete(id: string): Observable<Category>{
    const url = `${this.baseurl}/${id}`
    return this.http.delete<Category>(url)
  }
}
