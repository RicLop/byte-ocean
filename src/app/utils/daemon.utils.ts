import { Daemon } from "../models/daemon.model";
import { consumeResource, processConversion, resources } from "./game.utils";

export const daemons: Array<Daemon> = [];

export let daemonCost = 0.000002;
let daemonId = 1;

const dataDaemonCycle = 2000;
const processorDaemonCycle = 8000;

const selectDaemonType = (): string => {
    const hasDataDaemon = daemons.some(d => d.resource === 'D');
    if (!hasDataDaemon) {
        return 'D';
    }

    const rand = Math.random();
    return rand > 0.25 ? 'D' : 'M';
}

const getCycleTimeForResource = (resource: string): number => {
    switch (resource) {
        case 'D':
            return dataDaemonCycle;
        case 'M':
            return processorDaemonCycle;
        default:
            return dataDaemonCycle;
    }
}

export function buyDaemon() {
    resources[0].count -= daemonCost;

    const daemonType = selectDaemonType();
    const cycleTime = getCycleTimeForResource(daemonType);

    daemons.push({
        id: daemonId++,
        life: 10,
        efficiency: 1,
        resource: daemonType,
        cycleTime: cycleTime,
        progress: 0,
        isRunning: false,
        isPaused: false,
    });

    daemonCost *= 1.15;
}

export function updateDaemons() {
    daemons.forEach(daemon => {
      if (daemon.isPaused)
        return;
    
      if (!daemon.isRunning) {
        if (!consumeResource(daemon.resource))         
          return;

        daemon.isRunning = true;
      } 

      const progressIncrement = (100 / daemon.cycleTime) * 100;
      daemon.progress += progressIncrement;  

      if (daemon.progress >= 100) {
        processConversion(daemon.resource);
        daemon.progress = 0;
        daemon.isRunning = false;
      }
    });
  }