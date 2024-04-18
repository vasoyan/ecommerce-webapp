import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
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

  get<T>(id: number | string, endpoint: string): Observable<ApiResponse<T>> {
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}${endpoint}/${id}`)
      .pipe(
        map((response) => response), // Optional: Map to desired data type if needed
        catchError(this.handleError)
      );
  }

  create<T>(data: T, endpoint: string): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  update<T>(
    id: number | string,
    data: T,
    endpoint: string
  ): Observable<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(`${this.apiUrl}${endpoint}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  delete<T>(
    id: number | string,
    endpoint: string
  ): Observable<ApiResponse<boolean>> {
    return this.http
      .delete<ApiResponse<boolean>>(`${this.apiUrl}${endpoint}/${id}`)
      .pipe(
        catchError(this.handleError)
        // Optional: Map to a boolean if needed
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Use factory function
  }
}
