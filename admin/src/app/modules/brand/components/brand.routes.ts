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
        path: 'edit/:id',
        loadChildren: () =>
          import('./brand-forms/brand-forms.component').then(
            (m) => m.BrandFormsComponent
          ),
      }
    ],
  },
];
