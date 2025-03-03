import { ResourceType } from "../enums/resource-type.enum";

export interface Daemon {
    id: number;
    life: number;
    inputResource: ResourceType;
    inputAmount: number;
    outputResource: ResourceType;
    outputAmount: number;  
    efficiency: number;
    cycleTime: number;
    cost: number;
    progress: number;
    isRunning: boolean;
    isPaused: boolean;
}