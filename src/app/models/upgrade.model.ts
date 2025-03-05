import { ResourceType } from "../enums/resource-type.enum";
import { Upgrades } from "../enums/upgrade.enum";

export interface Upgrade {
  id: Upgrades;
  name: string;
  count: number;
  max: number;
  cost: number;
  costType: ResourceType;
  costProgression: number;
  rate: number;
  rateProgression: number;
}