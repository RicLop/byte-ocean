import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../core/ui/button/button.component';
import { upgrades } from '../../core/models/upgrade.model';
import { isUpgradeAvailable, upgrade } from '../../core/utils/upgrade.util'; 
import { resources, ResourceType } from '../../core/models/resource.model';
import { buyData, canBuyData, manualCripto } from '../../core/utils/resource.util'; 
import { daemons } from '../../core/utils/daemon.util';


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

  getUpgrades = () => upgrades;

  getDaemons = () => daemons;

  manualCripto = () => manualCripto();

  canBuyData = () => canBuyData();
  buyData = () => buyData();

  getDataAvailabilityProgress(): number {
    const progress = (resources[ResourceType.CriptoCoins].count / 500) * 100;
    return Math.min(progress, 100);
  }

  getUpgradeAvailabilityProgress(index: number): number {
    const upgrade = upgrades[index];
    const progress = (resources[upgrade.costType].count / upgrade.cost) * 100;
    return Math.min(progress, 100);
  }

  isUpgradeAvailable = (index: number) => isUpgradeAvailable(index);

  upgrade = (index: number) => upgrade(index);
}