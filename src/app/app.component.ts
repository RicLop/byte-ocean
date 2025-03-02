import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResourcesComponent } from './features/resources/resources.component';
import { CoreComponent } from './features/core/core.component';
import { UpgradesComponent } from './features/upgrades/upgrades.component';
import { interval } from 'rxjs';
import { updateUpgrades } from './utils/upgrade.utils';
import { updateDaemons } from './utils/daemon.utils';

@Component({
  selector: 'byo-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,    
    ResourcesComponent,
    CoreComponent,
    UpgradesComponent
  ]
})
export class AppComponent {
  title = 'byte-ocean';
  constructor() {
    interval(100).subscribe(() => this.updateGame());
  }

  updateGame() {
    updateUpgrades();
    updateDaemons();
  }
}