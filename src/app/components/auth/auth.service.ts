// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private readonly router: Router) {}

  private apiUrl = environment.apiUrl;

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.apiUrl}/user/login`, user);
  }

  register(user: Register): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/register`, user);
  }

  storeToken(access_token: string): void {
    localStorage.setItem('access_token', access_token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  clearToken(): void {
    localStorage.removeItem('access_token');
  }

  storeUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem('user') ?? 'null');
  }

  logout = () => {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
