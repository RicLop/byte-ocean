import { ResourceType } from "../enums/resource-type.enum";
import { Upgrades } from "../enums/upgrade.enum";
import { Upgrade } from "../models/upgrade.model";
import { resources } from "./game.utils";

export const upgrades: Array<Upgrade> = [
  {
    name: "Mineiração Manual",
    costType: ResourceType.CriptoCoins,
    cost: 0.000001,
    costProgression: 1.25,
    count: 1,
    max: 0
  },
  {
    name: "Mineiração Automágica",
    costType: ResourceType.CriptoCoins,
    cost: 0.000015,
    costProgression: 1,
    count: 0,
    max: 0
  },
];

let manualCriptoCoinsRate = 0.000001;

export function updateUpgrades() {
    if (upgrades[Upgrades.MineAuto].count == 1)
        resources[0].count += (manualCriptoCoinsRate * (upgrades[Upgrades.MineManual].count / 2) ) / 10;
}

export function upgrade(index: number) {
    if (resources[0].count >= upgrades[index].cost) {
        resources[0].count -= upgrades[index].cost;
        upgrades[index].count += 1;
        upgrades[index].cost *= upgrades[index].costProgression;
    }
}