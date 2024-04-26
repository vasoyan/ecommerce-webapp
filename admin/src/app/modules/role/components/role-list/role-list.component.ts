import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Role } from '../../models/role';
import { Subscription } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
})
export class RoleListComponent implements OnInit {
  displayedColumns: string[] = ['action', 'id', 'name', 'roles'];
  roleDataSource!: MatTableDataSource<Role>;
  route: string = 'roles';
  private subscription: Subscription | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _roleService: RoleService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router
  ) {
    this.roleDataSource = new MatTableDataSource<Role>([]);
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  ngAfterViewInit() {
    this.roleDataSource.sort = this.sort;
    this.roleDataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription?.unsubscribe();
  }

  loadRoles(): void {
    this.subscription = this._roleService.getList().subscribe({
      next: (response: Role[]) => {
        if (response && response.length > 0) {
          // console.log(response);
          this.roleDataSource.data = response;
        } else {
          this.roleDataSource.data = [];
          console.error('No roles found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading roles:', error);
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
    // console.log('id' + id);
    this._router.navigateByUrl(`/${this.route}/edit/${id}`);
  }

  onDelete(id: number) {
    // console.log('delete Id: ' + id);
    this.subscription = this._roleService.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          // console.log('roles found and deleted:', response);
          this.loadRoles();
        } else {
          console.error('No roles found or invalid response:', response);
        }
      },
      error: (error) => {
        console.error('Error loading roles:', error);
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
    this.roleDataSource.filter = filterValue.trim().toLowerCase();

    if (this.roleDataSource.paginator) {
      this.roleDataSource.paginator.firstPage();
    }
  }
}
