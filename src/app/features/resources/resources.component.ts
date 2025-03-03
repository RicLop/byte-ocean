import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { getResourceCount, isResourceunlocked } from '../../utils/resource.utils';
import { resources } from '../../constants/resources.const';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component';

@Component({
  selector: 'byo-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
  imports: [
    CommonModule,
    ProgressBarComponent
  ],
})
export class ResourcesComponent {
  
  getResources() {
    return resources;
  }

  getResourceCount(index: number) {
    return getResourceCount(index);
  }

  isResourceunlocked(index: number) {
    return isResourceunlocked(index);
  }  
}
