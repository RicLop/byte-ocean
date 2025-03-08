export enum ResourceType {
    CriptoCoins = 0,
    DataPackets = 1,
    MemoryBlocks = 2,
    ProcessingCycles = 3,
    BinaryCodes = 4,
}

export class Resource {
    constructor(
        public name: string,
        public shortname: string,
        public type: ResourceType,
        public count: number,
        public max: number,
        public unlocked: boolean = false
    ) { }
}

export const resources: Resource[] = [
    new Resource("[C]ripto", "C", ResourceType.CriptoCoins, 0, 600, true),
    new Resource("[D]ados", "D", ResourceType.DataPackets, 0, 20),
    new Resource("[M]emórias", "M", ResourceType.MemoryBlocks, 0, 10),
    new Resource("[P]rocessadores", "P", ResourceType.ProcessingCycles, 0, 5),
    new Resource("[B]inários", "B", ResourceType.BinaryCodes, 0, 2)
];