import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImServiceService {

  private apiUrl = 'http://localhost:8000/api/images/generate'; // Update with your API URL
  private saveApiUrl='http://localhost:8000/api/images/save-image';
  private baseUrl='http://localhost:8000/api/images';
  private updateUrl='http://localhost:8000/api/images/images-update';

  
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

}
