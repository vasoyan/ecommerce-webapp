import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { BrandFormsComponent } from './modules/brand/components/brand-forms/brand-forms.component';
import { BrandListComponent } from './modules/brand/components/brand-list/brand-list.component';
import { CategoryListComponent } from './modules/category/components/category-list/category-list.component';
import { CategoryFormsComponent } from './modules/category/components/category-forms/category-forms.component';

export const routes: Routes = [
  { title: 'exommerce | Home', path: '', component: HomeComponent },
  { title: 'exommerce | Home', path: 'home', component: HomeComponent },
  {
    title: 'exommerce | Brands',
    path: 'brands',
    children: [ // Use children for nested routes
      { path: '', component: BrandListComponent },
      { path: 'add', component: BrandFormsComponent },
      { path: 'edit/:id', component: BrandFormsComponent },
    ],
  },
  {
    title: 'exommerce | Categories',
    path: 'category',
    children: [ // Use children for nested routes
      { path: '', component: CategoryListComponent },
      { path: 'add', component: CategoryFormsComponent},
      { path: 'edit/:id', component: CategoryFormsComponent },
    ],
  },
  { title: 'exommerce | Not Found', path: '**', component: NotFoundComponent },
];
