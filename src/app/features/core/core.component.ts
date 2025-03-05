import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { buyDaemon, daemons, isDaemonAvailable } from '../../utils/daemon.utils';
import { isUpgradeAvailable, upgrade } from '../../utils/upgrade.utils';
import { ButtonComponent } from '../../ui/button/button.component';
import { Upgrades } from '../../enums/upgrade.enum';
import { resources } from '../../constants/resources.const';
import { upgrades as upgradesConst} from '../../constants/upgrades.const';
import { availableDaemons } from '../../constants/available-daemons.const';
import { ResourceType } from '../../enums/resource-type.enum';

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

  upgrades = upgradesConst;

  availableDaemons = availableDaemons;

  daemons = daemons;

  manualCripto() {
    const resource = resources[0];
    if (resource.count >= resource.max) 
      return;

    resource.count = Math.min(resource.count + this.upgrades[Upgrades.MineManual].rate, resource.max);
  }

  getUpgradeAvailabilityProgress(index: number): number {
    const upgrade = this.upgrades[index];
    const progress = (resources[upgrade.costType].count / upgrade.cost) * 100;
    return Math.min(progress, 100);
  }

  getDaemonAvailabilityProgress(index: number): number {
    const daemon = availableDaemons[index];
    const progress = (resources[0].count / daemon.cost) * 100;
    return Math.min(progress, 100);
  } 

  isUpgradeAvailable = (index: number) => isUpgradeAvailable(index);

  upgrade = (index: number) => upgrade(index);

  isDaemonAvailable = (index: number) => isDaemonAvailable(index);

  buyDaemon = (index: number) => buyDaemon(index);
}