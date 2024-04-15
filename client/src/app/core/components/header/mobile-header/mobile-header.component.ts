import { Component } from '@angular/core';
import { WrapHeaderMobileComponent } from './wrap-header-mobile/wrap-header-mobile.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [WrapHeaderMobileComponent, TopBarComponent, MobileMenuComponent],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {

}
