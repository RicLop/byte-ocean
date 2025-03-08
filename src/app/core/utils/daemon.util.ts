import { Daemon } from "../models/daemon.model";
import { resources, ResourceType } from "../models/resource.model";

export const daemons: Array<Daemon> = [];

export const daemonSystemCost = 600

export let hasDaemonSystem = false;

export function isDaemonSystemAvailable(): boolean {
    return resources[ResourceType.CriptoCoins].count >= daemonSystemCost;
}

export function buyDaemonSystem() {
    resources[ResourceType.CriptoCoins].count -= daemonSystemCost;
    hasDaemonSystem = true;
}

export function canGenerateDaemon(): boolean {
    return resources[ResourceType.DataPackets].count >= 10;
}

export function generateDaemon() {
    resources[ResourceType.DataPackets].count -= 10;;
}