import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { buyDaemon, daemonCost, daemons, isDaemonAvailable, updateDaemons } from '../../utils/daemon.utils';
import { isUpgradeAvailable, updateUpgrades, upgrade, upgrades } from '../../utils/upgrade.utils';
import { Upgrade } from '../../models/upgrade.model';
import { interval } from 'rxjs';
import { ResourceType } from '../../enums/resource-type.enum';
import { Upgrades } from '../../enums/upgrade.enum';
import { resources } from '../../constants/resources.const';
import { TooltipDirective } from '../../directives/tooltip.directive';

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
    TooltipDirective,
  ],
})
export class HomeComponent {
  baseCriptoCoinsRate = 0.000001;
  manualCriptoCoinsRate = 0.000001;

  constructor() {
    interval(100).subscribe(() => this.updateGame());
  }

  updateGame() {
    updateUpgrades();
    updateDaemons();
  }

  // Resources

  getResourceCount(index: number) {
    const count = resources[index].count;

    if (index == ResourceType.CriptoCoins) {
      const padded = Math.floor(count).toString().padStart(7, '0');
      return padded[0] + '.' + padded.slice(1);
    }

    return count;
  }

  isResourceunlocked(index: number) {
    return resources[index].unlocked;
  }

  manualCripto() {
    resources[0].count += upgrades[Upgrades.MineManual].rate;
  }

  // Upgrades

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

  // Daemons

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
