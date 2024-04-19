import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Role } from '../models/role';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../shared/models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly endpoint = 'Role';

  constructor(private httpService: HttpService<Role>) {}

  getList(): Observable<Role[]> {
    return this.httpService
      .getList(this.endpoint)
      .pipe(
        map((response: ApiResponse<Role[]>) => this.handleResponse(response))
      );
  }

  getById(id: number | string): Observable<Role> {
    return this.httpService
      .get<Role>(id, this.endpoint)
      .pipe(
        map((response: ApiResponse<Role>) => this.handleResponse(response))
      );
  }

  create(role: Role): Observable<Role> {
    return this.httpService
      .create<Role>(role, `${this.endpoint}/save`)
      .pipe(
        map((response: ApiResponse<Role>) => this.handleResponse(response))
      );
  }

  update(id: number | string, role: Role): Observable<Role> {
    return this.httpService
      .update<Role>(id, role, `${this.endpoint}/update`)
      .pipe(
        map((response: ApiResponse<Role>) => this.handleResponse(response))
      );
  }

  delete(id: number | string): Observable<boolean> {
    return this.httpService.delete<boolean>(id, `${this.endpoint}/delete`).pipe(
      map((response: ApiResponse<boolean>) => {
        if (response.success) {
          return true; // Handle successful deletion
        } else {
          console.error('Error deleting role:', response);
          throw new Error('Error deleting role');
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
