import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { availableDaemons, buyDaemon, daemons, isDaemonAvailable } from '../../utils/daemon.utils';
import { isUpgradeAvailable, upgrade, upgrades } from '../../utils/upgrade.utils';
import { Upgrades } from '../../enums/upgrade.enum';
import { resources } from '../../constants/resources.const';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'byo-core',
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  imports: [
    CommonModule,
    ButtonComponent,
  ],
})
export class CoreComponent {

  manualCripto() {
    resources[0].count += upgrades[Upgrades.MineManual].rate;
  }

  geUpgradeRate(index: number): string {
    const rate = upgrades[index].rate;
    const padded = Math.floor(rate).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  getUpgradeCost(index: number): string {
    const cost = upgrades[index].cost;
    const padded = Math.floor(cost).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  getUpgradeCount(index: number): number {
    return upgrades[index].count;
  }

  hasUpgrade(index: number): boolean {
    return this.getUpgradeCount(index) >= 1;
  }

  isUpgradeAvailable(index: number): boolean {
    return isUpgradeAvailable(index);
  }

  upgrade(index: number): void {
    upgrade(index);
  }

  getUpgradeAvailabilityProgress(index: number): number {
    const upgradeItem = upgrades[index];
    const cost = upgradeItem.cost;
    const resourceCount = resources[upgradeItem.costType].count;
    const progress = (resourceCount / cost) * 100;
    return Math.min(progress, 100);
  }

  getDaemons() {
    return daemons;
  }

  getDaemonCost(index: number): string {
    const daemon = availableDaemons[index];
    const padded = Math.floor(daemon.cost).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  getDaemonAvailabilityProgress(index: number): number {
    const daemon = availableDaemons[index];
    const cost = daemon.cost;
    const resourceCount = resources[daemon.inputResource].count;
    const progress = (resourceCount / cost) * 100;
    return Math.min(progress, 100);
  }

  isDaemonAvailable(index: number): boolean {
    return isDaemonAvailable(index);
  }

  buyDaemon(index: number) {
    buyDaemon(index);
  }
}
