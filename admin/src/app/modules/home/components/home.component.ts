import { Component } from '@angular/core';
import { BannerComponent } from '../../../core/components/banner/banner.component';
import { ProductComponent } from '../../product/components/product-list/product.component';
import { ProductModalComponent } from '../../product/components/product-modal/product-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    ProductComponent,
    ProductModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
