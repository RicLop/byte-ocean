import { ResourceType } from "../enums/resource-type.enum";

export interface Upgrade {
  name: string;
  count: number;
  max: number;
  cost: number;
  costType: ResourceType;
  costProgression: number;
  rate: number;
  rateProgression: number;
}