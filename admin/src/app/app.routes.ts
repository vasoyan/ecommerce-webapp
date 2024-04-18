import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  { title: 'exommerce | Home', path: '', component: HomeComponent },
  { title: 'exommerce | Home', path: 'home', component: HomeComponent },
  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/components/product.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./modules/brand/components/brand-list/brand-list.component').then(
        (m) => m.BrandListComponent
      ),
  },
  { title: 'exommerce | Not Found', path: '**', component: NotFoundComponent },
];
