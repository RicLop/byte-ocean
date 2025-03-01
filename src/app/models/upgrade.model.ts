import { ResourceType } from "../enums/resource-type.enum";

export interface Upgrade {
    name: string;
    cost: number;
    costType: ResourceType;
    costProgression: number;
    count: number;
    max: number;
}