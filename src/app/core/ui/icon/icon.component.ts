import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'byo-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [
    CommonModule
  ],
})
export class IconComponent {
  @Input() icon: String = ''; 
}