import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResourcesComponent } from './features/resources/resources.component';
import { CoreComponent } from './features/core/core.component';
import { interval } from 'rxjs';
import { updateUpgrades } from './core/utils/upgrade.util';
import { DaemonsComponent } from './features/daemons/daemons.component';

@Component({
  selector: 'byo-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,    
    ResourcesComponent,
    CoreComponent,
    DaemonsComponent
  ]
})
export class AppComponent {
  title = 'byte-ocean';
  constructor() {
    interval(100).subscribe(() => this.updateGame());
  }

  updateGame() {
    updateUpgrades();
  }
}