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

export function consumeResource(resource: string): boolean {
  switch (resource) {
    case 'D':
      if (resources[0].count >= resources[1].conversion?.countUsed!) {
        resources[0].count -= resources[1].conversion?.countUsed!;
        return true;
      }
      return false;
    case 'M':
      if (resources[1].count >= resources[2].conversion?.countUsed!) {
        resources[1].count -= resources[2].conversion?.countUsed!;
        return true;
      }
      return false;
    default:
      return true;
  }
}

export function processConversion(resource: string): void {
  switch (resource) {
    case 'D':
      if (!resources[1].unlocked)
        resources[1].unlocked = true;
      resources[1].count += 1;
      break;
    case 'M':
      if (!resources[2].unlocked)
        resources[2].unlocked = true;
      resources[2].count += 1;
      break;
    default:
      break;
  }
}