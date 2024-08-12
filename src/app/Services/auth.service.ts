import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';  // Update with your Django API URL
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email:username, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name:username, email, password });
  }
  private storeUserInLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  updateProfile(data: any): Observable<any> {
    return this.http.put('/api/user', data); // Replace with your API endpoint
  }

  deleteProfile(): Observable<any> {
    return this.http.delete('/api/user'); // Replace with your API endpoint
  }

  public loadUserFromLocalStorage(): void {
    const token = localStorage.getItem('token');
    console.log('Loaded token from localStorage:', token);
  
    if (token) {
      try {
        // Decode the token
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        
        // Extract user data from the decoded token
        const user = {
          username: decodedToken.name,  // Adjust based on your token's structure
          email: decodedToken.email         // Adjust based on your token's structure
        };
  
        // Update the BehaviorSubject with the extracted user data
        this.userSubject.next(user);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.userSubject.next(null);
      }
    } else {
      this.userSubject.next(null);
    }
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
  
}

