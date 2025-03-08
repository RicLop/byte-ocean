import { ResourceType } from "./resource.model";

export enum UpgradeTypes {
  MineManual = 0,
  MineAuto = 1,
}

export class Upgrade {
  constructor(
    public id: UpgradeTypes,
    public name: string,
    public costType: ResourceType,
    public cost: number,
    public costProgression: number,
    public count: number = 0,
    public max: number = 0,
    public rate: number,
    public rateProgression: number
  ) { }
}

export const upgrades: Upgrade[] = [
  new Upgrade(UpgradeTypes.MineManual, "Mineração Manual", ResourceType.CriptoCoins, 1, 1.25, 0, 0, 1, 1),
  new Upgrade(UpgradeTypes.MineAuto, "Mineração Automática", ResourceType.CriptoCoins, 100, 1.5, 0, 0, 0, 1),
];