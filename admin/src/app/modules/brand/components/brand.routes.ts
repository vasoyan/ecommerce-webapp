import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'brands',
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
        path: 'edit',
        loadComponent: () =>
          import('./brand-edit/brand-edit.component').then(
            (m) => m.BrandEditComponent
          ),
      },
      {
        path: 'details',
        loadComponent: () =>
          import('./brand-details/brand-details.component').then(
            (m) => m.BrandDetailsComponent
          ),
      },
    ],
  },
];
