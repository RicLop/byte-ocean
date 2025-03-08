import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { resources } from '../../core/models/resource.model';
import { ButtonComponent } from '../../core/ui/button/button.component';
import { buyDaemonSystem, canGenerateDaemon, daemonSystemCost, generateDaemon, hasDaemonSystem, isDaemonSystemAvailable } from '../../core/utils/daemon.util';

@Component({
  selector: 'byo-daemons',
  templateUrl: './daemons.component.html',
  styleUrl: './daemons.component.scss',
  imports: [
    CommonModule,
    ButtonComponent
  ],
})
export class DaemonsComponent {
  daemonSystemCost = daemonSystemCost;

  getResources() {
    return resources;
  }

  hasDaemonSystem() {
    return hasDaemonSystem;
  }

  getDaemonSystemAvailabilityProgress(): number {
    const progress = (resources[0].count / this.daemonSystemCost) * 100;
    return Math.min(progress, 100);
  }

  getDaemonAvailabilityProgress(): number {
    const progress = (resources[1].count / 10) * 100;
    return Math.min(progress, 100);
  }

  isDaemonSystemAvailable = () => isDaemonSystemAvailable();

  buyDaemonSystem = () => buyDaemonSystem();

  canGenerateDaemon = () => canGenerateDaemon();

  generateDaemon = () => generateDaemon();
}
