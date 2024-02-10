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

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseurl, category).pipe(
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

  update(category: Category): Observable<Category>{
    const url = `${this.baseurl}/${category.id}`
    return this.http.patch<Category>(url, category)
  }

  delete(id: string): Observable<Category>{
    const url = `${this.baseurl}/${id}`
    return this.http.delete<Category>(url)
  }
}
