import { resources } from "../constants/resources.const";
import { ResourceType } from "../enums/resource-type.enum";

export function getResourceCount(index: number): number {
  return resources[index].count;
}

export function isResourceunlocked(index: number): boolean {
  return resources[index].unlocked;
}

export function consumeResource(inResource: ResourceType, outResource: ResourceType, amount: number): boolean {
  if (resources[inResource].count < amount || resources[outResource].count >= resources[outResource].max)
    return false;

  resources[inResource].count -= amount;
  return true;  
}

export function processConversion(resource: ResourceType, amount: number): void {
  if (!resources[resource].unlocked)
    resources[resource].unlocked = true;
  resources[resource].count += amount;
}
