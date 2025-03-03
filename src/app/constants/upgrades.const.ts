import { ResourceType } from "../enums/resource-type.enum";
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
    name: "Mineiração Automática",
    costType: ResourceType.CriptoCoins,
    cost: 100,
    costProgression: 1.5,
    count: 0,
    max: 0,
    rate: 0,
    rateProgression: 1,
  },
];