import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  apiUrl: string = 'https://localhost:7190/api/';

  constructor(private http: HttpClient) {}

  getList(endpoint: string): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.apiUrl}${endpoint}`);
  }
}
