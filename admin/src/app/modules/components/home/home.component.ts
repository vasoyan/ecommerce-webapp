import { Component } from '@angular/core';
import { SliderComponent } from '../../../core/components/slider/slider.component';
import { BannerComponent } from '../../../core/components/banner/banner.component';
import { ProductModalComponent } from '../product/product-modal/product-modal.component';
import { ProductComponent } from '../product/product-list/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    BannerComponent,
    ProductComponent,
    ProductModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
