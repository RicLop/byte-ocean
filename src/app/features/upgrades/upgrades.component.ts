import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { daemons } from '../../utils/daemon.utils';
import { IconComponent } from '../../ui/icon/icon.component';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component';
import { upgrades } from '../../constants/upgrades.const';

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

  getUpgradeRate(index: number): number {
    return upgrades[index].rate;
  }

  hasUpgrade(index: number): boolean {
    return upgrades[index].count >= 1;
  }
  
  getDaemons() {
    return daemons;
  }

  toggleDaemon(daemon: any): void {
    daemon.isPaused = !daemon.isPaused;
  }
}
