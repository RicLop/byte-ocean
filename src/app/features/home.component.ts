import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  ],
})
export class HomeComponent {
  // Resources
  criptoCoins = 0;
  dataPackets = 0;
  memoryBlocks = 0;
  processingCycles = 0;
  binaryCodes = 0;

  // Rates
  baseCriptoCoinsRate = 0.000001;
  manualCriptoCoinsRate = 0.000001;
  dataConversionRate = 0.000010;
  memoryConversionRate = 10;
  processingConversionRate = 5;
  binaryConversionRate = 2;
  criptoConversionRate = 1;

  // Daemons
  daemons: any[] = [];
  daemonId = 1;

  // Costs
  daemonCost = 0.000002;
  manualUpgradeCost = 0.000003;

  dataDaemonCycle = 2000;
  processorDaemonCycle = 8000;

  autoMining = false;

  constructor() {
    setInterval(() => this.updateGame(), 100);
  }

  updateGame() {
    this.updateAutoMining();
    this.updateDaemons();
  }

  manualCripto(rate: number) {
    this.criptoCoins += rate;
  }

  setAutoMining() {
    if (this.criptoCoins >= this.manualUpgradeCost) {
      this.criptoCoins -= this.manualUpgradeCost;
      this.autoMining = true;
    }
  }

  updateAutoMining() {
    if (this.autoMining)
      this.criptoCoins += this.manualCriptoCoinsRate / 10;
  }
  
  upgradeManualMining() {
    if (this.criptoCoins >= this.manualUpgradeCost) {
      this.criptoCoins -= this.manualUpgradeCost;
      this.manualCriptoCoinsRate += this.baseCriptoCoinsRate;
      this.manualUpgradeCost *= 1.2;
    }
  }

  buyDaemon() {    
    this.criptoCoins -= this.daemonCost;
    
    const daemonType = this.selectDaemonType();
    const cycleTime = this.getCycleTimeForResource(daemonType);
    
    this.daemons.push({
      id: this.daemonId++,
      resource: daemonType,
      cycleTime: cycleTime,
      progress: 0,
      isRunning: false,
      isPaused: false,
    });
    
    this.daemonCost *= 1.15;
  }

  private selectDaemonType(): string {
    const hasDataDaemon = this.daemons.some(d => d.resource === 'D');
    if (!hasDataDaemon) {
      return 'D';
    }

    const rand = Math.random();
    return rand > 0.25 ? 'D' : 'M';
  }

  private getCycleTimeForResource(resource: string): number {
    switch (resource) {
      case 'D':
        return this.dataDaemonCycle;
      case 'M':
        return this.processorDaemonCycle;
      default:
        return this.dataDaemonCycle;
    }
  }

  toggleDaemon(daemon: any): void {
    daemon.isPaused = !daemon.isPaused;
  }

  updateDaemons() {
    this.daemons.forEach(daemon => {
      if (daemon.isPaused)
        return;
    
      if (!daemon.isRunning) {
        if (!this.consumeResource(daemon.resource))         
          return;

        daemon.isRunning = true;
      } 

      const progressIncrement = (100 / daemon.cycleTime) * 100;
      daemon.progress += progressIncrement;  

      if (daemon.progress >= 100) {
        this.processConversion(daemon.resource);
        daemon.progress = 0;
        daemon.isRunning = false;
      }
    });
  }
  
  private consumeResource(resource: string): boolean {
    switch (resource) {
      case 'D':
        if (this.criptoCoins >= this.dataConversionRate) {
          this.criptoCoins -= this.dataConversionRate;
          return true;
        }
        return false;
      case 'M':
        if (this.dataPackets >= this.memoryConversionRate) {
          this.dataPackets -= this.memoryConversionRate;
          return true;
        }
        return false;
      default:
        return true;
    }
  }
  
  private processConversion(resource: string): void {
    switch (resource) {
      case 'D':
        this.dataPackets += 1;
        break;
      case 'M':
        this.memoryBlocks += 1;
        break;
      case 'P':
        if (this.memoryBlocks >= this.processingConversionRate) {
          this.memoryBlocks -= this.processingConversionRate;
          this.processingCycles += 1;
        }
        break;
      case 'B':
        if (this.processingCycles >= this.binaryConversionRate) {
          this.processingCycles -= this.binaryConversionRate;
          this.binaryCodes += 1;
        }
        break;
      case 'C':
        if (this.binaryCodes >= this.criptoConversionRate) {
          this.binaryCodes -= this.criptoConversionRate;
          this.criptoCoins += 1;
        }
        break;
      default:
        console.warn("Algo deu errado na conversão.");
    }
  }
}
