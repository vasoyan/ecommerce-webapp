import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Brand } from '../models/brand';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly endpoint = 'Brand';

  constructor(private httpService: HttpService<Brand>) {}

  getBrandList(): Observable<Brand[]> {
    return this.httpService.getList(this.endpoint).pipe(
      // Use map operator to transform ApiResponse<Brand[]> to Brand[]
      map((response: ApiResponse<Brand[]>) => {
        if (response.success && response.data && response.data.length > 0) {
          return response.data; // Return the array of brands
        } else {
          console.error('No brands found or invalid response:', response);
          throw new Error('No brands found or invalid response');
        }
      })
    );
  }
}