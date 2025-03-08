import { resources, ResourceType } from "../models/resource.model";
import { upgrades, UpgradeTypes } from "../models/upgrade.model";

let criptoAccumulator: number = 0;

export function updateUpgrades(): void {
  const autoUpgrade = upgrades[UpgradeTypes.MineAuto];
  const maxedOut = resources[ResourceType.CriptoCoins].count >= resources[ResourceType.CriptoCoins].max;

  if (!maxedOut && autoUpgrade.count > 0) {
    criptoAccumulator += autoUpgrade.rate * 0.3;

    if (criptoAccumulator < 1)
      return;

    const intIncrement = Math.floor(criptoAccumulator);
    resources[ResourceType.CriptoCoins].count += intIncrement;
    criptoAccumulator -= intIncrement;
  }
}

export function isUpgradeAvailable(index: number): boolean {
  if (index < 0 || index >= upgrades.length)
    return false;

  const upgrade = upgrades[index];
  if (upgrade.max !== 0 && upgrade.count >= upgrade.max)
    return false;

  return resources[upgrade.costType].count >= upgrade.cost;
}

export function upgrade(index: number): void {
  if (!isUpgradeAvailable(index))
    return;

  resources[ResourceType.CriptoCoins].count -= upgrades[index].cost;
  upgrades[index].count += 1;
  upgrades[index].rate += upgrades[index].rateProgression;
  upgrades[index].cost = Math.ceil(upgrades[index].cost * upgrades[index].costProgression);
}
