import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Category } from '../models/category';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly endpoint = 'Category';

  constructor(private httpService: HttpService<Category>) {}

  getList(): Observable<Category[]> {
    return this.httpService
      .getList(this.endpoint)
      .pipe(
        map((response: ApiResponse<Category[]>) => this.handleResponse(response))
      );
  }

  getById(id: number | string): Observable<Category> {
    return this.httpService
      .get<Category>(id, this.endpoint)
      .pipe(
        map((response: ApiResponse<Category>) => this.handleResponse(response))
      );
  }

  create(category: Category): Observable<Category> {
    return this.httpService
      .create<Category>(category, `${this.endpoint}/save`)
      .pipe(
        map((response: ApiResponse<Category>) => this.handleResponse(response))
      );
  }

  update(id: number | string, category: Category): Observable<Category> {
    return this.httpService
      .update<Category>(id, category, `${this.endpoint}/update`)
      .pipe(
        map((response: ApiResponse<Category>) => this.handleResponse(response))
      );
  }

  delete(id: number | string): Observable<boolean> {
    return this.httpService.delete<boolean>(id, `${this.endpoint}/delete`).pipe(
      map((response: ApiResponse<boolean>) => {
        if (response.success) {
          return true; // Handle successful deletion
        } else {
          console.error('Error deleting category:', response);
          throw new Error('Error deleting category');
        }
      })
    );
  }

  // Helper function for handling successful responses
  private handleResponse<T>(response: ApiResponse<T>): T {
    if (response.success && response.data) {
      return response.data;
    } else {
      console.error('Error in response:', response);
      throw new Error('Error in response');
    }
  }
}
