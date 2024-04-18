import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Brand } from '../models/brand';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly endpoint = 'Brand';

  constructor(private httpService: HttpService<Brand>) {}

  getBrandList(): Observable<Brand[]> {
    return this.httpService
      .getList(this.endpoint)
      .pipe(
        map((response: ApiResponse<Brand[]>) => this.handleResponse(response))
      );
  }

  getBrand(id: number | string): Observable<Brand> {
    return this.httpService
      .get<Brand>(id, this.endpoint)
      .pipe(
        map((response: ApiResponse<Brand>) => this.handleResponse(response))
      );
  }

  createBrand(brand: Brand): Observable<Brand> {
    return this.httpService
      .create<Brand>(brand, `${this.endpoint}/save`)
      .pipe(
        map((response: ApiResponse<Brand>) => this.handleResponse(response))
      );
  }

  updateBrand(id: number | string, brand: Brand): Observable<Brand> {
    return this.httpService
      .update<Brand>(id, brand, `${this.endpoint}/update`)
      .pipe(
        map((response: ApiResponse<Brand>) => this.handleResponse(response))
      );
  }

  deleteBrand(id: number | string): Observable<boolean> {
    return this.httpService.delete<boolean>(id, `${this.endpoint}/delete`).pipe(
      map((response: ApiResponse<boolean>) => {
        if (response.success) {
          return true; // Handle successful deletion
        } else {
          console.error('Error deleting brand:', response);
          throw new Error('Error deleting brand');
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
