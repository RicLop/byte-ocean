import { resources } from "../constants/resources.const";
import { upgrades } from "../constants/upgrades.const";
import { ResourceType } from "../enums/resource-type.enum";
import { Upgrades } from "../enums/upgrade.enum";

let criptoAccumulator = 0;

export function updateUpgrades() {
  const updateInterval = 0.3;

  const autoUpgrade = upgrades[Upgrades.MineAuto];
  var maxedOut = resources[ResourceType.CriptoCoins].count >= resources[ResourceType.CriptoCoins].max

  if (!maxedOut && autoUpgrade && autoUpgrade.count > 0) {
    const increment = autoUpgrade.rate * updateInterval;
    criptoAccumulator += increment;
    
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