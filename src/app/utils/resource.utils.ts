import { resources } from "../constants/resources.const";
import { ResourceType } from "../enums/resource-type.enum";

export function getResourceCount(index: number): String {
  const count = resources[index].count;

  if (index == ResourceType.CriptoCoins) {
    const padded = Math.floor(count).toString().padStart(7, '0');
    return padded[0] + '.' + padded.slice(1);
  }

  return count.toString();
}

export function isResourceunlocked(index: number): boolean {
  return resources[index].unlocked;
}

export function consumeResource(resource: ResourceType, amount: number): boolean {
  switch (resource) {
    case ResourceType.DataPackets:
      if (resources[0].count >= amount) {
        resources[0].count -= amount;
        return true;
      }
      return false;
    case ResourceType.MemoryBlocks:
      if (resources[1].count >= amount) {
        resources[1].count -= amount;
        return true;
      }
      return false;
    default:
      return true;
  }
}

export function processConversion(resource: ResourceType, amount: number): void {
  switch (resource) {
    case ResourceType.DataPackets:
      if (!resources[1].unlocked)
        resources[1].unlocked = true;
      resources[1].count += amount;
      break;
    case ResourceType.MemoryBlocks:
      if (!resources[2].unlocked)
        resources[2].unlocked = true;
      resources[2].count += amount;
      break;
    default:
      break;
  }
}
