import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../../models/brand';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BrandService } from '../../services/brand.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss',
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];

  displayedColumns: string[] = ['action', 'id', 'name', 'description'];
  brandsDataSource!: MatTableDataSource<Brand>;
  route: string = 'brands';
  private subscription: Subscription | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _brandService: BrandService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router
  ) {
    this.brandsDataSource = new MatTableDataSource<Brand>([]);
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  ngAfterViewInit() {
    this.brandsDataSource.sort = this.sort;
    this.brandsDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  loadBrands(): void {
    this.subscription = this._brandService.getBrandList().subscribe({
      next: (response: Brand[]) => {
        if (response && response.length > 0) {
          this.brandsDataSource.data = response;
        } else {
          this.brandsDataSource.data = [];
          console.error('No brands found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading brands:', error);
        // Handle error gracefully (e.g., display error message to user)
      },
      complete: () => {
        // Optional complete callback if needed
      },
    });
  }

  onAdd(): void {
    this._router.navigateByUrl(`/${this.route}/add`);
  }

  onEdit(id: number): void {
    console.log('id' + id);
    this._router.navigateByUrl(`/${this.route}/edit/${id}`);
  }

  onDelete(id: number) {
    console.log("delete Id: " + id);
    this.subscription = this._brandService.deleteBrand(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          console.log('brands found and deleted:', response);
          this.loadBrands();
        } else {
          console.error('No brands found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      },
      complete: () => {
      },
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
    this.brandsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.brandsDataSource.paginator) {
      this.brandsDataSource.paginator.firstPage();
    }
  }
}
