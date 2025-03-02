import { resources } from "../constants/resources.const";
import { ResourceType } from "../enums/resource-type.enum";
import { Upgrades } from "../enums/upgrade.enum";
import { Upgrade } from "../models/upgrade.model";

export const upgrades: Array<Upgrade> = [
  {
    name: "Mineiração Manual",
    costType: ResourceType.CriptoCoins,
    cost: 1,
    costProgression: 1.25,
    count: 0,
    max: 0,
    rate: 1,
    rateProgression: 1,
  },
  {
    name: "Mineiração Automágica",
    costType: ResourceType.CriptoCoins,
    cost: 100,
    costProgression: 2,
    count: 0,
    max: 1,
    rate: 0,
    rateProgression: 1,
  },
];

let criptoAccumulator = 0;

export function updateUpgrades() {
  const updateInterval = 0.3; //updateUpgrades runs within 300ms

  const autoUpgrade = upgrades[Upgrades.MineAuto];
  if (autoUpgrade && autoUpgrade.count > 0) {
    const increment = autoUpgrade.rate * updateInterval;
    criptoAccumulator += increment;
    
    // Quando o acumulador alcança 1 ou mais, atualizamos o recurso
    if (criptoAccumulator >= 1) {
      const intIncrement = Math.floor(criptoAccumulator);
      resources[ResourceType.CriptoCoins].count += intIncrement;
      criptoAccumulator -= intIncrement;
    }
  }
}

export function isUpgradeAvailable(index: number): boolean {
  if (index < 0 || index >= upgrades.length)
    return false;

  const upgrade = upgrades[index];
  if (upgrade.max != 0 && upgrade.count >= upgrade.max)
    return false;  

  const resourceCount = resources[upgrade.costType].count;
  if (resourceCount < upgrade.cost)
    return false;

  return true;
}

export function upgrade(index: number) {
  if (resources[0].count >= upgrades[index].cost) {
    resources[0].count -= upgrades[index].cost;
    upgrades[index].count += 1;

    upgrades[index].rate += upgrades[index].rateProgression;
    upgrades[index].cost = Math.ceil(upgrades[index].cost * upgrades[index].costProgression);
  }
}