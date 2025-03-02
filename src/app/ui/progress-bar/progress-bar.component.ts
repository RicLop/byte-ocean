import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'byo-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  imports: [
    CommonModule
  ],
})
export class ProgressBarComponent {
  @Input() value: number = 0; 
  @Input() maxValue: number = 100; 
}