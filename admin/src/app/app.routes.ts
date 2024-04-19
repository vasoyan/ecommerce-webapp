import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { BrandFormsComponent } from './modules/brand/components/brand-forms/brand-forms.component';
import { BrandListComponent } from './modules/brand/components/brand-list/brand-list.component';
import { CategoryListComponent } from './modules/category/components/category-list/category-list.component';
import { CategoryFormsComponent } from './modules/category/components/category-forms/category-forms.component';
import { RoleListComponent } from './modules/role/components/role-list/role-list.component';
import { RoleFormsComponent } from './modules/role/components/role-forms/role-forms.component';
import { PermissionListComponent } from './modules/permission/components/permission-list/permission-list.component';
import { PermissionFormsComponent } from './modules/permission/components/permission-forms/permission-forms.component';

export const routes: Routes = [
  { title: 'exommerce | Home', path: '', component: HomeComponent },
  { title: 'exommerce | Home', path: 'home', component: HomeComponent },
  {
    title: 'exommerce | Brands',
    path: 'brands',
    children: [
      { path: '', component: BrandListComponent },
      { path: 'add', component: BrandFormsComponent },
      { path: 'edit/:id', component: BrandFormsComponent },
    ],
  },
  {
    title: 'exommerce | Categories',
    path: 'categories',
    children: [
      { path: '', component: CategoryListComponent },
      { path: 'add', component: CategoryFormsComponent },
      { path: 'edit/:id', component: CategoryFormsComponent },
    ],
  },
  {
    title: 'exommerce | Roles',
    path: 'roles',
    children: [
      { path: '', component: RoleListComponent },
      { path: 'add', component: RoleFormsComponent },
      { path: 'edit/:id', component: RoleFormsComponent },
    ],
  },
  {
    title: 'exommerce | Permissions',
    path: 'permissions',
    children: [
      { path: '', component: PermissionListComponent },
      { path: 'add', component: PermissionFormsComponent },
      { path: 'edit/:id', component: PermissionFormsComponent },
    ],
  },
  { title: 'exommerce | Not Found', path: '**', component: NotFoundComponent },
];
