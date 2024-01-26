// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.apiUrl}/user/login`, user);
  }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.apiUrl}/user/register`, user);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  clearToken(): void {
    localStorage.removeItem('token');
  }
}
