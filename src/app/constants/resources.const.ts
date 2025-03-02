import { ResourceType } from "../enums/resource-type.enum";
import { Resource } from "../models/resource.model";

export const resources: Array<Resource> = [
    {
      name: "[C]ripto",
      shortname: "C",
      type: ResourceType.CriptoCoins,
      count: 0,
      unlocked: true,
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
      unlocked: false,
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
      unlocked: false,
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
      unlocked: false,
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
      unlocked: false,
      conversion: {
        resourceUsed: ResourceType.ProcessingCycles,
        countUsed: 8,
        countReceived: 1,
      }
    },
  ];