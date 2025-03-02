import { ResourceType } from "../enums/resource-type.enum";

export interface Resource {
    name: string;
    shortname: string;
    type: ResourceType;
    unlocked: boolean;
    count: number;
    conversion: Conversion | undefined;
}

export interface Conversion {
    resourceUsed: ResourceType;
    countUsed: number;
    countReceived: number;
}