import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { BrandEditComponent } from './modules/brand/components/brand-edit/brand-edit.component';
import { BrandListComponent } from './modules/brand/components/brand-list/brand-list.component';

export const routes: Routes = [
  { title: 'exommerce | Home', path: '', component: HomeComponent },
  { title: 'exommerce | Home', path: 'home', component: HomeComponent },
  { title: 'exommerce | Brands', path: 'brands', component: BrandListComponent },
  { title: 'exommerce | Brands| Add',path: 'brands/edit', component: BrandEditComponent },
  { title: 'exommerce | Brands| Edit',path: 'brands/edit/:id', component: BrandEditComponent },
  { title: 'exommerce | Not Found', path: '**', component: NotFoundComponent },
];
