interface DPTMemory {
    type: string;
}

interface MineDPTMemory extends DPTMemory {
    eSourceId: string;
    creepIds: string[];
    storageId: string;
}
