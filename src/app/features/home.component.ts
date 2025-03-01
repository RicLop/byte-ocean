import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
  ],
})
export class HomeComponent {
  btcBalance = 0;
  dataPackets = 0;
  memoryBlocks = 0;
  processingCycles = 0;
  binaryCodes = 0;

  manualMiningRate = 0.000001;
  memoryConversionRate = 10;
  processingConversionRate = 5;
  binaryConversionRate = 2;
  criptoConversionRate = 1;

  daemons: any[] = [];
  daemonId = 1;
  daemonCost = 0.000002;
  canDownloadDaemon = false;

  manualUpgradeCost = 0.001;
  upgradeCost = 0.002;

  constructor() {
    setInterval(() => this.updateGame(), 1000); // Roda a cada 1 segundo
  }

  updateGame() {
    this.updateDaemons();  // Processa Daemons ativos
    // this.generateResources();  // Adiciona recursos conforme o tempo passa
    // this.checkMilestones();  // Verifica se milestones foram atingidas
    // this.triggerRandomEvents();  // Possíveis eventos aleatórios
  }

  mineCripto(rate: number) {
    this.btcBalance += rate;
  }

  convertDataToMemory() {
    if (this.dataPackets >= this.memoryConversionRate) {
      this.dataPackets -= this.memoryConversionRate;
      this.memoryBlocks += 1;
    }
  }

  convertMemoryToProcessing() {
    if (this.memoryBlocks >= this.processingConversionRate) {
      this.memoryBlocks -= this.processingConversionRate;
      this.processingCycles += 1;
    }
  }

  convertProcessingToBinary() {
    if (this.processingCycles >= this.binaryConversionRate) {
      this.processingCycles -= this.binaryConversionRate;
      this.binaryCodes += 1;
    }
  }

  convertBinaryToCripto() {
    if (this.processingCycles >= this.criptoConversionRate) {
      this.processingCycles -= this.criptoConversionRate;
      this.btcBalance += 1;
    }
  }

  upgradeManualMining() {
    if (this.btcBalance >= this.manualUpgradeCost) {
      this.btcBalance -= this.manualUpgradeCost;
      this.manualMiningRate += 0.0002;
      this.manualUpgradeCost *= 1.2;
    }
  }

  buyDaemon() {
    if (this.btcBalance >= this.daemonCost) {
      this.btcBalance -= this.daemonCost;
      this.daemons.push({ id: this.daemonId++, resource: 'DP', progress: 0, rate: 1, interval: 25 });
      this.daemonCost *= 1.15;
    }
  }

  fuseDaemons() {
    // if (this.btcBalance >= this.upgradeCost) {
    //   this.btcBalance -= this.upgradeCost;
    //   this.daemons.forEach(daemon => daemon.rate += 0.0002);
    //   this.upgradeCost *= 1.2;
    // }
  }

  updateDaemons() {
    this.daemons.forEach(daemon => {
      daemon.progress += daemon.interval;
      if (daemon.progress >= 100) {
        switch (daemon.resource) {
          case 'BTC':
            this.btcBalance += daemon.rate;
            break;
          case 'DP':
            this.dataPackets += daemon.rate;
            break;
          case 'MB':
            this.memoryBlocks += daemon.rate;
            break;
          case 'PC':
            this.processingCycles += daemon.rate;
            break;
          case 'BC':
            this.binaryCodes += daemon.rate;
            break;
          default:
            console.log('Recurso desconhecido: ', daemon.resource);
        }
        daemon.progress = 0;
      }
    });
  }
}
