import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { isUpgradeAvailable, upgrade, upgrades } from '../../utils/upgrade.utils';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { resources } from '../../constants/resources.const';

@Component({
  selector: 'byo-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    TooltipDirective,
  ],
})
export class ButtonComponent {

  @Input() index: number = 0; 
  @Input() text: String = ''; 

  availabilityProgress: number = 0;

  geUpgradeRate(): String {
    const rate = upgrades[this.index].rate;

    const padded = Math.floor(rate).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  getUpgradeCost(): String {
    const cost = upgrades[this.index].cost;

    const padded = Math.floor(cost).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  getUpgradeCount(): number {
    return upgrades[this.index].count;
  }

  hasUpgrade(): boolean {
    return this.getUpgradeCount() >= 1;
  }

  isUpgradeAvailable(): boolean {
    return isUpgradeAvailable(this.index);
  }

  upgrade(): void {
    upgrade(this.index);
  }

  getAvailabilityProgress(): number {
    const cost = upgrades[this.index].cost;
    const resourceCount = resources[upgrades[this.index].costType].count;
  
    const progress = (resourceCount / cost) * 100;
    return Math.min(progress, 100);
  }
}