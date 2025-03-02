import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { buyDaemon, daemonCost, daemons, isDaemonAvailable } from '../../utils/daemon.utils';
import { isUpgradeAvailable, upgrade, upgrades } from '../../utils/upgrade.utils';
import { Upgrades } from '../../enums/upgrade.enum';
import { resources } from '../../constants/resources.const';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    TooltipDirective,
  ],
})
export class CoreComponent {

  manualCripto() {
    resources[0].count += upgrades[Upgrades.MineManual].rate;
  }

  geUpgradeRate(index: number) {
    const rate = upgrades[index].rate;

    const padded = Math.floor(rate).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  getUpgradeCount(index: number): number {
    return upgrades[index].count;
  }

  hasUpgrade(index: number): boolean {
    return upgrades[index].count >= 1;
  }

  getUpgradeCost(index: number) {
    const cost = upgrades[index].cost;

    const padded = Math.floor(cost).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  isUpgradeAvailable(index: number): boolean {
    return isUpgradeAvailable(index);
  }

  upgrade(index: number) {
    upgrade(index);
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
}
