import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Permission } from '../../model/permission';
import { Subscription } from 'rxjs';
import { PermissionService } from '../../services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-permission-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './permission-forms.component.html',
  styleUrl: './permission-forms.component.scss',
})
export class PermissionFormsComponent implements OnInit {
  id!: number;
  isEdit!: boolean;
  permission?: Permission | null;
  route: string = 'permissions';
  private subscription: Subscription | undefined;

  constructor(
    private _permissionService: PermissionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  permissionForm = this._formBuilder.group({
    id: [0],
    name: ['', Validators.required],
  });

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;
      this.getBrandById(this.id);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  getBrandById(id: number): void {
    this.subscription = this._permissionService.getById(id).subscribe({
      next: (response: Permission) => {
        if (response) {
          this.permission = response;
          this.permissionForm.patchValue(this.permission);
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

  onSubmit(): void {
    if (this.permissionForm.valid) {
      const permission: Permission = {
        id: this.isEdit && this.id > 0 ? this.id : 0,
        name: this.permissionForm.value.name!,
        isChecked: false
      };

      console.log(permission);
      if (this.isEdit && this.id > 0) {
        this._permissionService.update(this.id, permission).subscribe({
          next: (updatedBrand: Permission) => {
            console.log('Permission updated successfully:', updatedBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating permission:', error);
          },
        });
      } else {
        this._permissionService.create(permission).subscribe({
          next: (updatedBrand: Permission) => {
            console.log('Permission created successfully:', updatedBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating permission:', error);
          },
        });
      }
    }
  }
}
