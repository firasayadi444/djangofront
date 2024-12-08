import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ImServiceService {

  private apiUrl = 'http://localhost:8000/api/images/generate'; // Update with your API URL
  private saveApiUrl='http://localhost:8000/api/images/save-image';
  private baseUrl='http://localhost:8000/api/images';
  private updateUrl='http://localhost:8000/api/images/images-update';

  private promptUrl = 'http://localhost:8000/api/mlpredict'

  
  constructor(private http: HttpClient) { }

  generateImage(prompt: string, width: number, height: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt, width, height });
  }
  saveImage(payload:any): Observable<any> {
    return this.http.post<any>(this.saveApiUrl, payload);
  }

  getMyImage(userId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user-images/?user_id=${userId}`); // Use query parameter
  }
  updateImage(imageId: string, data: { visibility?: boolean, likes?: number }): Observable<any> {
    return this.http.patch<any>(`${this.updateUrl}/${imageId}/`, data);
  }
  GetImage(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/visible-images`);
  }
  share(imageId: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/share-image/${imageId}/`, {visibility:true});
  }
  deleteImage(imageId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete-image/${imageId}/`);
  }

  getRandomPrompts(payload:any): Observable<any> {
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
    return this.http.post<any>(`${this.promptUrl}/predict`, payload,httpOptions);
  }

  getlastprompt(): Observable<any> {
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
    return this.http.get<any>(`${this.promptUrl}/lastprompt`, httpOptions);
  }

  

}
