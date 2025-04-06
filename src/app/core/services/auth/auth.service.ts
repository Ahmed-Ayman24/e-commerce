import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  private readonly router = inject(Router)
  userData: any;

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }
  getUserData(): void {
    this.userData = jwtDecode(localStorage.getItem('token')!)
  }
  logoutUser(): void {
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }
  setEmailVerify(data:object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }
  setCodeVerify(data:object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  setResetPassword(data:object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}