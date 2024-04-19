import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/apiResponse';
import { Permission } from '../model/permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly endpoint = 'Permission';

  constructor(private httpService: HttpService<Permission>) {}

  getList(): Observable<Permission[]> {
    return this.httpService
      .getList(this.endpoint)
      .pipe(
        map((response: ApiResponse<Permission[]>) => this.handleResponse(response))
      );
  }

  getById(id: number | string): Observable<Permission> {
    return this.httpService
      .get<Permission>(id, this.endpoint)
      .pipe(
        map((response: ApiResponse<Permission>) => this.handleResponse(response))
      );
  }

  create(permission: Permission): Observable<Permission> {
    return this.httpService
      .create<Permission>(permission, `${this.endpoint}/save`)
      .pipe(
        map((response: ApiResponse<Permission>) => this.handleResponse(response))
      );
  }

  update(id: number | string, permission: Permission): Observable<Permission> {
    return this.httpService
      .update<Permission>(id, permission, `${this.endpoint}/update`)
      .pipe(
        map((response: ApiResponse<Permission>) => this.handleResponse(response))
      );
  }

  delete(id: number | string): Observable<boolean> {
    return this.httpService.delete<boolean>(id, `${this.endpoint}/delete`).pipe(
      map((response: ApiResponse<boolean>) => {
        if (response.success) {
          return true; // Handle successful deletion
        } else {
          console.error('Error deleting permission:', response);
          throw new Error('Error deleting permission');
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
