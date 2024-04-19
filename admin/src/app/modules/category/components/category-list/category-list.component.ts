import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryService } from '../../services/category.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['action', 'id', 'name', 'description'];
  categoryDataSource!: MatTableDataSource<Category>;
  private subscription: Subscription | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _categoryService: CategoryService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router
  ) {
    this.categoryDataSource = new MatTableDataSource<Category>([]);
  }

  ngOnInit(): void {
    this.loadCategorys();
  }

  ngAfterViewInit() {
    this.categoryDataSource.sort = this.sort;
    this.categoryDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  loadCategorys(): void {
    this.subscription = this._categoryService.getList().subscribe({
      next: (response: Category[]) => {
        if (response && response.length > 0) {
          this.categoryDataSource.data = response;
        } else {
          this.categoryDataSource.data = [];
          console.error('No categorys found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading categorys:', error);
        // Handle error gracefully (e.g., display error message to user)
      },
      complete: () => {
        // Optional complete callback if needed
      },
    });
  }

  onAdd(): void {
    this._router.navigateByUrl(`/category/add`);
  }

  onEdit(id: number): void {
    console.log('id' + id);
    this._router.navigateByUrl(`/category/edit/${id}`);
  }

  onDelete(id: number) {
    console.log('delete Id: ' + id);
    this.subscription = this._categoryService.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          console.log('categorys found and deleted:', response);
          this.loadCategorys();
        } else {
          console.error('No categorys found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading categorys:', error);
      },
      complete: () => {},
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoryDataSource.filter = filterValue.trim().toLowerCase();

    if (this.categoryDataSource.paginator) {
      this.categoryDataSource.paginator.firstPage();
    }
  }
}
