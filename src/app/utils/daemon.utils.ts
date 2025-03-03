import { resources } from "../constants/resources.const";
import { ResourceType } from "../enums/resource-type.enum";
import { Daemon } from "../models/daemon.model";
import { consumeResource, processConversion } from "./resource.utils";

export const availableDaemons: Array<Daemon> = [
  {
    id: 0,
    life: 10,
    inputAmount: 2,
    inputResource: ResourceType.BinaryCodes,
    outputAmount: 1,
    outputResource: ResourceType.CriptoCoins,
    efficiency: 1,
    cycleTime: 10000,
    cost: 1000,
    progress: 0,
    isRunning: false,
    isPaused: false,
  },  
  {
    id: 0,
    life: 10,
    inputAmount: 5,
    inputResource: ResourceType.CriptoCoins,
    outputAmount: 1,
    outputResource: ResourceType.DataPackets,
    efficiency: 1,
    cycleTime: 2000,
    cost: 200,
    progress: 0,
    isRunning: false,
    isPaused: false,
  },
  {
    id: 0,
    life: 10,
    inputAmount: 10,
    inputResource: ResourceType.DataPackets,
    outputAmount: 1,
    outputResource: ResourceType.MemoryBlocks,
    efficiency: 1,
    cycleTime: 8000,
    cost: 400,
    progress: 0,
    isRunning: false,
    isPaused: false,
  },
];

export const daemons: Array<Daemon> = [];

let daemonId = 1;

export function isDaemonAvailable(index: number): boolean {
  return resources[ResourceType.CriptoCoins].count >= availableDaemons[index].cost;
}

export function buyDaemon(index: number) {
  resources[ResourceType.CriptoCoins].count -= availableDaemons[index].cost;

  const availableDaemon = availableDaemons.find(x => x.outputResource === index);
  const daemon = JSON.parse(JSON.stringify(availableDaemon));
  daemon.id = daemonId++;
  daemons.push(JSON.parse(JSON.stringify(daemon)));
}

export function updateDaemons() {
  daemons.forEach(daemon => {
    if (daemon.isPaused)
      return;

    if (!daemon.isRunning) {
      if (!consumeResource(daemon.inputResource, daemon.outputResource, daemon.inputAmount))
        return;
      daemon.isRunning = true;
    }
    
    const progressIncrement = (100 / daemon.cycleTime) * 100;
    daemon.progress += progressIncrement;

    if (daemon.progress >= 100) {
      processConversion(daemon.outputResource, daemon.outputAmount);
      daemon.progress = 0;
      daemon.isRunning = false;
    }
  });
}
