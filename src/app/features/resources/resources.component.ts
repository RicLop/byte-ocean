import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { getResourceCount, isResourceunlocked } from '../../utils/resource.utils';

@Component({
  selector: 'byo-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
  imports: [
    CommonModule
  ],
})
export class ResourcesComponent {
  
  getResourceCount(index: number) {
    return getResourceCount(index);
  }

  isResourceunlocked(index: number) {
    return isResourceunlocked(index);
  }  
}
