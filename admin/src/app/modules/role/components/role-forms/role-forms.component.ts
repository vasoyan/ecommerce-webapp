import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Role } from '../../models/role';
import { Subscription } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-forms',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './role-forms.component.html',
  styleUrl: './role-forms.component.scss'
})
export class RoleFormsComponent implements OnInit {
  id!: number;
  isEdit!: boolean;
  // role?: Role | null;
  route: string = 'roles';
  private subscription: Subscription | undefined;

  constructor(
    private _roleService: RoleService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  roleForm = this._formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    permissions: [[]] 
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
    this.subscription = this._roleService.getById(id).subscribe({
      next: (response: Role) => {
        if (response) {
          // this.role = response;
          console.log(response);
          this.roleForm?.patchValue(response);
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
    console.log(this.roleForm);
    if (this.roleForm.valid) {
      const role: Role = {
        id: this.isEdit && this.id > 0 ? this.id : 0,
        name: this.roleForm.value.name!,
        permissions: []
      };

      console.log(role);
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
          next: (updatedBrand: Role) => {
            console.log('Role created successfully:', updatedBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating role:', error);
          },
        });
      }
    }
  }
}
