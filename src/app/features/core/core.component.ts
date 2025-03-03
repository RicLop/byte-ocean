import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { availableDaemons, buyDaemon, daemons, isDaemonAvailable } from '../../utils/daemon.utils';
import { isUpgradeAvailable, upgrade } from '../../utils/upgrade.utils';
import { Upgrades } from '../../enums/upgrade.enum';
import { resources } from '../../constants/resources.const';
import { ButtonComponent } from '../../ui/button/button.component';
import { upgrades } from '../../constants/upgrades.const';

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
    if (resources[0].count >= resources[0].max)
      return;

    var total = resources[0].count + upgrades[Upgrades.MineManual].rate;
    resources[0].count = resources[0].max > total ? total : resources[0].max;
  }

  getUpgradeRate(index: number): number {
    return upgrades[index].rate;
  }

  getUpgradeCost(index: number): number {
    return upgrades[index].cost;
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

  getDaemonCost(index: number): number {
    return availableDaemons[index].cost;
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
