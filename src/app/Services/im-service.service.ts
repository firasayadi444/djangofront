import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImServiceService {

  private apiUrl = 'http://localhost:8000/api/images/generate'; // Update with your API URL

  constructor(private http: HttpClient) { }

  generateImage(prompt: string, width: number, height: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt, width, height });
  }
}
