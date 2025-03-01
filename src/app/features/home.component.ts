import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { resources } from '../utils/game.utils';
import { buyDaemon, daemonCost, daemons, updateDaemons } from '../utils/daemon.utils';
import { updateUpgrades, upgrade, upgrades } from '../utils/upgrade.utils';
import { Upgrade } from '../models/upgrade.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class HomeComponent {
  baseCriptoCoinsRate = 0.000001;
  manualCriptoCoinsRate = 0.000001;

  constructor() {
    setInterval(() => this.updateGame(), 100);
  }

  updateGame() {
    updateUpgrades();
    updateDaemons();
  }

  getDaemons() {
    return daemons;
  }

  getDaemonCost() {
    return daemonCost;
  }

  getResourceCount(index: number) {
    return resources[index].count;
  }

  buyDaemon() {
    buyDaemon();
  }

  toggleDaemon(daemon: any): void {
    daemon.isPaused = !daemon.isPaused;
  }  

  manualCripto(rate: number) {
    resources[0].count += rate;
  }

  getUpgrade(index: number): Upgrade {
    return upgrades[index];
  }

  upgrade(index: number) {
    upgrade(index);
  }
}
