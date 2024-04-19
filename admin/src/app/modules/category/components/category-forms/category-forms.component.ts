import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './category-forms.component.html',
  styleUrl: './category-forms.component.scss',
})
export class CategoryFormsComponent implements OnInit {
  id!: number;
  isEdit!: boolean;
  category?: Category | null;
  private subscription: Subscription | undefined;

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  categoryForm = this._formBuilder.group({
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
    this.subscription = this._categoryService.getById(id).subscribe({
      next: (response: Category) => {
        if (response) {
          this.category = response;
          this.categoryForm.patchValue(this.category);
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
    if (this.categoryForm.valid) {
      const category: Category = {
        id: this.isEdit && this.id > 0 ? this.id : 0,
        name: this.categoryForm.value.name!,
        description: this.categoryForm.value.description,
      };

      console.log(category);
      if (this.isEdit && this.id > 0) {
        this._categoryService.update(this.id, category).subscribe({
          next: (updatedBrand: Category) => {
            console.log('Category updated successfully:', updatedBrand);
            this._router.navigate(['/category']);
          },
          error: (error) => {
            console.error('Error updating category:', error);
          },
        });
      } else {
        this._categoryService.create(category).subscribe({
          next: (updatedBrand: Category) => {
            console.log('Category created successfully:', updatedBrand);
            this._router.navigate(['/category']);
          },
          error: (error) => {
            console.error('Error updating category:', error);
          },
        });
      }
    }
  }
}
