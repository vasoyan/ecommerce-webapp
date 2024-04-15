import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
})
export class DesktopMenuComponent {}
