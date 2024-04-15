import { Component } from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DesktopMenuComponent } from './desktop-menu/desktop-menu.component';

@Component({
  selector: 'app-desktop-header',
  standalone: true,
  imports: [TopBarComponent, DesktopMenuComponent],
  templateUrl: './desktop-header.component.html',
  styleUrl: './desktop-header.component.scss'
})
export class DesktopHeaderComponent {

}
