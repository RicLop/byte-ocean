import { ResourceType } from "../enums/resource-type.enum";
import { Daemon } from "../models/daemon.model";
import { Resource } from "../models/resource.model";
import { Upgrade } from "../models/upgrade.model";


  // // Rates
  // baseCriptoCoinsRate = 0.000001;
  // manualCriptoCoinsRate = 0.000001;


  // // Daemons
  // daemons: any[] = [];
  // daemonId = 1;

  // // Costs
  // daemonCost = 0.000002;
  // manualUpgradeCost = 0.000003;

  // dataDaemonCycle = 2000;
  // processorDaemonCycle = 8000;

  // autoMining = false;


export const resources: Array<Resource> = [
  {
    name: "[C]ripto",
    shortname: "C",
    type: ResourceType.CriptoCoins,
    count: 0,
    conversion: {
      resourceUsed: ResourceType.BinaryCodes,
      countUsed: 1,
      countReceived: 1,
    }
  },
  {
    name: "[D]ados",
    shortname: "D",
    type: ResourceType.DataPackets,
    count: 0,
    conversion: {
      resourceUsed: ResourceType.CriptoCoins,
      countUsed: 0.000010,
      countReceived: 1,
    }
  },
  {
    name: "[M]emórias",
    shortname: "M",
    type: ResourceType.MemoryBlocks,
    count: 0,
    conversion: {
      resourceUsed: ResourceType.DataPackets,
      countUsed: 6,
      countReceived: 1,
    }
  },
  {
    name: "[P]rocessadores",
    shortname: "P",
    type: ResourceType.ProcessingCycles,
    count: 0,
    conversion: {
      resourceUsed: ResourceType.MemoryBlocks,
      countUsed: 4,
      countReceived: 1,
    }
  },
  {
    name: "[B]inários",
    shortname: "B",
    type: ResourceType.BinaryCodes,
    count: 0,
    conversion: {
      resourceUsed: ResourceType.ProcessingCycles,
      countUsed: 8,
      countReceived: 1,
    }
  },
];

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
      resources[1].count += 1;
      break;
    case 'M':
      resources[2].count += 1;
      break;
    default:
      console.warn("Algo deu errado na conversão.");
  }
}