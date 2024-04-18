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


@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss',
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];

  displayedColumns: string[] = ['id', 'name', 'description'];
  brandsDataSource!: MatTableDataSource<Brand>;
  private subscription: Subscription | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private brandService: BrandService , private _liveAnnouncer: LiveAnnouncer) {
    this.brandsDataSource = new MatTableDataSource<Brand>([]);
  }

  ngOnInit(): void {
    this.loadBrands();
    // this.brandsDataSource.sort = this.sort;
    // this.brandsDataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.brandsDataSource.sort = this.sort;
    this.brandsDataSource.paginator = this.paginator;
  }

  loadBrands(): void {
    this.subscription = this.brandService.getBrandList().subscribe({
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

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
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
