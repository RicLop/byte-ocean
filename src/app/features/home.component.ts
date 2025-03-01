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
  title = 'Cripto Miner';
  btcBalance = 0;
  progress = 0;
  miners: any[] = [];
  minerId = 1;

  minerCost = 0.005; // Custo inicial da mineradora
  upgradeCost = 0.002; // Custo inicial do upgrade
  manualUpgradeCost = 0.001; // Custo do upgrade de mineração manual
  manualMiningRate = 0.001; // Taxa de mineração manual
  manualMiningProgress = 0; // Progresso da mineração manual
  canBuyMiner = false; // Se pode comprar mineradora automática

  constructor() {
    setInterval(() => this.updateMiners(), 100);
  }

  mine() {
    if (this.progress >= 100) {
      this.btcBalance += this.manualMiningRate; // Ganha BTC pela mineração manual
      this.progress = 0;
    } else {
      this.progress += 20;
    }
  }

  // Upgrade da mineração manual
  upgradeManualMining() {
    if (this.btcBalance >= this.manualUpgradeCost) {
      this.btcBalance -= this.manualUpgradeCost;
      this.manualMiningRate += 0.0002; // Aumenta a taxa de mineração manual
      this.manualUpgradeCost *= 1.2; // Aumenta o custo de upgrade a cada melhoria
      this.canBuyMiner = true; // Permite comprar mineradoras automáticas após o upgrade
    }
  }

  buyMiner() {
    if (this.btcBalance >= this.minerCost) {
      this.btcBalance -= this.minerCost;
      this.miners.push({ id: this.minerId++, progress: 0, rate: 0.0005, interval: 5000 });
      this.minerCost *= 1.15; // Aumenta o custo a cada compra
    }
  }

  upgradeMiners() {
    if (this.btcBalance >= this.upgradeCost) {
      this.btcBalance -= this.upgradeCost;
      this.miners.forEach(miner => miner.rate += 0.0002); // Aumenta a produção das mineradoras
      this.upgradeCost *= 1.2; // Aumenta o custo a cada melhoria
    }
  }

  updateMiners() {
    this.miners.forEach(miner => {
      miner.progress += (100 / (miner.interval / 100));
      if (miner.progress >= 100) {
        this.btcBalance += miner.rate;
        miner.progress = 0;
      }
    });
  }
}