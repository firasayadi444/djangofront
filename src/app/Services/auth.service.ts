import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  updateProfile(userId: any,data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
        // Decode the token to extract the ID
        const decodedToken: any = jwtDecode(token);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add the token here
      })
    };
    return this.http.patch(`${this.apiUrl}/user/${userId}`, data, httpOptions); // Replace with your API endpoint
  }

  deleteProfile(userId:any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
        // Decode the token to extract the ID
        const decodedToken: any = jwtDecode(token);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add the token here
      })
    };
    return this.http.delete(`${this.apiUrl}/user/${userId}`, httpOptions); // Replace with your API endpoint
  }

  public loadUserFromLocalStorage(): void {
    const token = localStorage.getItem('token');
    console.log('Loaded token from localStorage:', token);
  
    if (token) {
      try {
        
        // Decode the token to extract the ID
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        const userId = decodedToken.id; 
        console.log('userid:', userId);

        
        // // Extract user data from the decoded token
        // const user = {
        //   username: decodedToken.name,  // Adjust based on your token's structure
        //   email: decodedToken.email         // Adjust based on your token's structure
        // };
  
        // Update the BehaviorSubject with the extracted user data
    //     this.userSubject.next(user);
    //   } catch (error) {
    //     console.error('Error decoding token:', error);
    //     this.userSubject.next(null);
    //   }
    // } else {
    //   this.userSubject.next(null);
    // Fetch user data using the ID
    this.getUserById(userId,token).subscribe(
      user => {
        this.userSubject.next(user);
        this.storeUserInLocalStorage(user);  // Optional: Store user data in localStorage
      },
      error => {
        console.error('Failed to fetch user data:', error);
        this.userSubject.next(null);
      }
    );

     } catch (error) {
      console.error('Error decoding token:', error);
       this.userSubject.next(null);
      }
     } else {
      this.userSubject.next(null);
}
}

// Method to fetch user data by ID
getUserById(userId: number, token : string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add the token here
    })
  };
  return this.http.get(`${this.apiUrl}/user/${userId}`,httpOptions);
}

getUser(): Observable<any> {
  return this.userSubject.asObservable();
}

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
  
}



