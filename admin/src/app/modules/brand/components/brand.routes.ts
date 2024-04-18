import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'brands',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./brand-list/brand-list.component').then(
            (m) => m.BrandListComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./brand-add/brand-add.component').then(
            (m) => m.BrandAddComponent
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./brand-edit/brand-edit.component').then(
            (m) => m.BrandEditComponent
          ),
      }
    ],
  },
];
