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
  // Resources
  criptoCoins = 0;
  dataPackets = 0;
  memoryBlocks = 0;
  processingCycles = 0;
  binaryCodes = 0;

  // Rates
  baseCriptoCoinsRate = 0.000001;
  manualCriptoCoinsRate = 0.000001;
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

  lastUpdate = Date.now();

  constructor() {
    setInterval(() => this.updateGame(), 1000); // Atualização global de 1 segundo
  }

  updateGame() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastUpdate) / 1000; // Tempo em segundos desde a última atualização
    this.lastUpdate = currentTime;
    
    // Atualizar Daemons com base no tempo passado
    this.updateDaemons(deltaTime);
  }


  mineCripto(rate: number) {
    this.criptoCoins += rate;
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
      this.criptoCoins += 1;
    }
  }

  upgradeManualMining() {
    if (this.criptoCoins >= this.manualUpgradeCost) {
      this.criptoCoins -= this.manualUpgradeCost;
      this.manualCriptoCoinsRate += this.baseCriptoCoinsRate;
      this.manualUpgradeCost *= 1.2;
    }
  }

  buyDaemon() {
    if (this.criptoCoins >= this.daemonCost) {
      this.criptoCoins -= this.daemonCost;
      this.daemons.push({ id: this.daemonId++, resource: 'D', progress: 0, rate: 1, interval: 10 });
      this.daemonCost *= 1.15;
    }
  }

  updateDaemons(deltaTime: number) {
    this.daemons.forEach(daemon => {
      // Atualiza o progresso baseado no tempo real
      daemon.progress += daemon.rate * deltaTime; // Progresso gradual com base no tempo

      if (daemon.progress >= 100) {
        // Quando o progresso atingir ou ultrapassar 100, realizamos a conversão
        switch (daemon.resource) {
          case 'C':
            this.criptoCoins += daemon.rate;
            break;
          case 'D':
            this.dataPackets += daemon.rate;
            break;
          case 'M':
            this.memoryBlocks += daemon.rate;
            break;
          case 'P':
            this.processingCycles += daemon.rate;
            break;
          case 'B':
            this.binaryCodes += daemon.rate;
            break;
          default:
            console.log('Recurso desconhecido: ', daemon.resource);
        }
        
        // Resetando o progresso após cada ciclo
        daemon.progress = 0;
      }
    });
  }
}
