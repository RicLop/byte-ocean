import { ResourceType } from "../enums/resource-type.enum";
import { Resource } from "../models/resource.model";

export const resources: Array<Resource> = [
    {
      name: "[C]ripto",
      shortname: "C",
      type: ResourceType.CriptoCoins,
      count: 0,
      max: 200,
      unlocked: true
    },
    {
      name: "[D]ados",
      shortname: "D",
      type: ResourceType.DataPackets,
      count: 0,
      max: 20,
      unlocked: false
    },
    {
      name: "[M]emórias",
      shortname: "M",
      type: ResourceType.MemoryBlocks,
      count: 0,
      max: 10,
      unlocked: false
    },
    {
      name: "[P]rocessadores",
      shortname: "P",
      type: ResourceType.ProcessingCycles,
      count: 0,
      max: 5,
      unlocked: false
    },
    {
      name: "[B]inários",
      shortname: "B",
      type: ResourceType.BinaryCodes,
      count: 0,
      max: 2,
      unlocked: false
    },
  ];