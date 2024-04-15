import { Routes } from '@angular/router';
import { HomeComponent } from './modules/components/home/home.component';
import { ProductComponent } from './modules/components/product/product-list/product.component';

export const routes: Routes = [
  { title: 'exommerce | Home', path: '', component: HomeComponent },
  { title: 'exommerce | Home', path: 'home', component: HomeComponent },
  {
    title: 'exommerce | Products',
    path: 'products',
    component: ProductComponent,
  },
];
