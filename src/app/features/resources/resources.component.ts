import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../core/ui/progress-bar/progress-bar.component';
import { resources } from '../../core/models/resource.model';

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
}
