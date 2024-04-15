import { Routes } from '@angular/router';
import { HomeComponent } from './modules/components/home/home.component';
import { ProductComponent } from './modules/components/product/product-list/product.component';
import { BlogComponent } from './modules/components/blog/blog.component';
import { AboutComponent } from './modules/components/about/about.component';
import { ContactComponent } from './modules/components/contact/contact.component';
import { ProductDetailComponent } from './modules/components/product/product-detail/product-detail.component';
import { BlogDetailsComponent } from './modules/components/blog/blog-details/blog-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'shop', component: ProductComponent },
  // { path: 'details', component: ProductDetailComponent },
  { path: 'shop/details', component: ProductDetailComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/details', component: BlogDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];
