import { ResourceType } from "../enums/resource-type.enum";

export interface Resource {
    name: string;
    shortname: string;
    type: ResourceType;
    unlocked: boolean;
    count: number;
    max: number;
}