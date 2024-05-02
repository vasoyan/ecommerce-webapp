import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Role } from '../../models/role';
import { Subscription } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Permission } from '../../../permission/model/permission';
import { MatCheckbox } from '@angular/material/checkbox';
import { PermissionService } from '../../../permission/services/permission.service';

// Features
// Uses Reactive Forms for form management.
// Fetches permissions asynchronously on component initialization (for create) or fetches role data and populates the form on edit.
// Dynamically creates form controls for permissions based on fetched data.
// Handles user interaction with permission checkboxes to update the form value.
// Filters checked permissions when submitting the form.
// Implements error handling for data fetching and form submission.

@Component({
  selector: 'app-role-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCheckbox,
  ],
  templateUrl: './role-forms.component.html',
  styleUrl: './role-forms.component.scss',
})
export class RoleFormsComponent implements OnInit {
  id!: number;
  isEdit!: boolean;
  route: string = 'roles';
  private subscription: Subscription | undefined;

  constructor(
    private _roleService: RoleService,
    private _permissionService: PermissionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  roleForm = this._formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    permissions: this._formBuilder.array([] as Permission[]),
  });

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;
      this.getBrandById(this.id);
    } else {
      this.loadPermissions();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  loadPermissions(): void {
    this.subscription = this._permissionService.getList().subscribe({
      next: (response: Permission[]) => {
        if (response && response.length > 0) {
          const role: Role = {
            id: 0,
            name: '',
            permissions: response,
          };

          if (this.isRoleWithPermissionsArray(role)) {
            this.updatePermissionsFormArray(response);
            this.roleForm.patchValue(role);
            // console.log(this.roleForm);
          }
        } else {
          console.error('No permissions found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
      },
      complete: () => {},
    });
  }

  getBrandById(id: number): void {
    this.subscription = this._roleService.getById(id).subscribe({
      next: (response: Role) => {
        if (response) {
          if (this.isRoleWithPermissionsArray(response)) {
            this.updatePermissionsFormArray(response.permissions);
            this.roleForm.patchValue(response);
            // console.log(this.roleForm);
          } else {
            console.warn(
              'Unexpected response format. Permissions not an array.'
            );
          }
        } else {
          console.error('No brands found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      },
      complete: () => {},
    });
  }

  isRoleWithPermissionsArray(
    response: Role
  ): response is Role & { permissions: Permission[] } {
    return Array.isArray(response.permissions);
  }

  updatePermissionsFormArray(permission: Permission[]): void {
    const permissionsControl = this.roleForm.get('permissions') as FormArray;
    permissionsControl.clear(); // Clear existing controls

    permission?.forEach((permission) => {
      permissionsControl.push(
        this._formBuilder.group({
          id: permission.id,
          name: permission.name,
          isChecked: permission.isChecked,
        })
      );
    });
  }

  onSubmit(): void {
    const filteredPermissions = this.roleForm.value.permissions?.filter(
      (p) => p?.isChecked === true
    ) as Permission[];

    if (this.roleForm.valid) {
      const role: Role = {
        id: this.isEdit && this.id > 0 ? this.id : 0,
        name: this.roleForm.value.name!,
        permissions: filteredPermissions,
      };

      if (this.isEdit && this.id > 0) {
        this._roleService.update(this.id, role).subscribe({
          next: (updatedBrand: Role) => {
            console.log('Role updated successfully:', updatedBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating role:', error);
          },
        });
      } else {
        this._roleService.create(role).subscribe({
          next: (createdBrand: Role) => {
            console.log('Role created successfully:', createdBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating role:', error);
          },
        });
      }
    }
  }

  onPermissionChange(index: number, isChecked: boolean): void {
    const permissionControl = (
      this.roleForm.get('permissions') as FormArray
    ).at(index) as FormControl;
    permissionControl.setValue({ ...permissionControl.value, isChecked }); // Spread existing values and update isChecked
    // console.log(permissionControl.value);
  }

  onCancelClick(): void {
    this._router.navigate([`/${this.route}`]);
  }
}