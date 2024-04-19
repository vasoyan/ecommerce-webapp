import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Permission } from '../../model/permission';
import { Subscription } from 'rxjs';
import { PermissionService } from '../../services/permission.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent implements OnInit {
  displayedColumns: string[] = ['action', 'id', 'name'];
  permissionDataSource!: MatTableDataSource<Permission>;
  route: string = 'permissions';
  private subscription: Subscription | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _permissionService: PermissionService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router
  ) {
    this.permissionDataSource = new MatTableDataSource<Permission>([]);
  }

  ngOnInit(): void {
    this.loadPermissions();
  }

  ngAfterViewInit() {
    this.permissionDataSource.sort = this.sort;
    this.permissionDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  loadPermissions(): void {
    this.subscription = this._permissionService.getList().subscribe({
      next: (response: Permission[]) => {
        if (response && response.length > 0) {
          this.permissionDataSource.data = response;
        } else {
          this.permissionDataSource.data = [];
          console.error('No permissions found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
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
    console.log('delete Id: ' + id);
    this.subscription = this._permissionService.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          console.log('permissions found and deleted:', response);
          this.loadPermissions();
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.permissionDataSource.filter = filterValue.trim().toLowerCase();

    if (this.permissionDataSource.paginator) {
      this.permissionDataSource.paginator.firstPage();
    }
  }
}
