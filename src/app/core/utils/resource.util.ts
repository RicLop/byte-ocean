import { resources, ResourceType } from "../models/resource.model";
import { upgrades, UpgradeTypes } from "../models/upgrade.model";

export function manualCripto() {
    const resource = resources[0];
    if (resource.count >= resource.max)
        return;

    resource.count = Math.min(resource.count + upgrades[UpgradeTypes.MineManual].rate, resource.max);
}

export function canBuyData(): boolean {
    return  resources[0].count >= 500;
}

export function buyData() {
    if (!canBuyData())
        return;

    if (!consumeResource(ResourceType.CriptoCoins, 500, ResourceType.DataPackets))
        return;

    processConversion(ResourceType.DataPackets, 1);
}

export function consumeResource(inResource: ResourceType, inAmount: number, outResource: ResourceType ): boolean {
    if (resources[inResource].count < inAmount || resources[outResource].count >= resources[outResource].max)
        return false;

    resources[inResource].count -= inAmount;
    return true;
}

export function processConversion(resource: ResourceType, amount: number): void {
    if (!resources[resource].unlocked)
        resources[resource].unlocked = true;

    resources[resource].count += amount;
}