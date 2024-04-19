import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() value: string = '';
}
