import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Brand } from '../../models/brand';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-brand-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './brand-forms.component.html',
  styleUrl: './brand-forms.component.scss',
})
export class BrandFormsComponent implements OnInit {
  id!: number;
  isEdit!: boolean;
  brands?: Brand | null;
  route: string = 'brands';
  private subscription: Subscription | undefined;

  constructor(
    private _brandService: BrandService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  brandForm = this._formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
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
    this.subscription = this._brandService.getBrand(id).subscribe({
      next: (response: Brand) => {
        if (response) {
          this.brands = response;
          this.brandForm.patchValue(this.brands);
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
    if (this.brandForm.valid) {
      const brand: Brand = {
        id: this.isEdit && this.id > 0 ? this.id : 0,
        name: this.brandForm.value.name!,
        description: this.brandForm.value.description,
      };

      console.log(brand);
      if (this.isEdit && this.id > 0) {
        this._brandService.updateBrand(this.id, brand).subscribe({
          next: (updatedBrand: Brand) => {
            console.log('Brand updated successfully:', updatedBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating brand:', error);
          },
        });
      } else {
        this._brandService.createBrand(brand).subscribe({
          next: (updatedBrand: Brand) => {
            console.log('Brand created successfully:', updatedBrand);
            this._router.navigate([`/${this.route}`]);
          },
          error: (error) => {
            console.error('Error updating brand:', error);
          },
        });
      }
    }
  }
}
