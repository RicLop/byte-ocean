import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { buyDaemon, daemonCost, daemons, isDaemonAvailable } from '../../utils/daemon.utils';
import { isUpgradeAvailable, upgrades } from '../../utils/upgrade.utils';
import { IconComponent } from '../../ui/icon/icon.component';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component';

@Component({
  selector: 'byo-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.scss',
  imports: [
    CommonModule,
    IconComponent,
    ProgressBarComponent,
  ],
})
export class UpgradesComponent {

  getUpgradeRate(index: number) {
    const rate = upgrades[index].rate;

    const padded = Math.floor(rate).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  hasUpgrade(index: number): boolean {
    return upgrades[index].count >= 1;
  }

  isUpgradeAvailable(index: number): boolean {
    return isUpgradeAvailable(index);
  }
  
  getDaemons() {
    return daemons;
  }

  getDaemonCost() {
    const padded = Math.floor(daemonCost).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  isDaemonAvailable(): boolean {
    return isDaemonAvailable();
  }

  buyDaemon() {
    buyDaemon();
  }

  toggleDaemon(daemon: any): void {
    daemon.isPaused = !daemon.isPaused;
  }
}
