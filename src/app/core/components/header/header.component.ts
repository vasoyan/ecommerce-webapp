import { Component } from '@angular/core';
import { DesktopHeaderComponent } from './desktop-header/desktop-header.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { ModalSearchComponent } from './modal-search/modal-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DesktopHeaderComponent, MobileHeaderComponent, ModalSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
}
