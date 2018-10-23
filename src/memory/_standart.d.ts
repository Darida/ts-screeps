interface Memory {
    sources: { [id: string]: SourceMemory };
    departments: { [id: string]: DPTMemory };
}
interface CreepMemory {
    dptId: string;
}
interface FlagMemory {
}
interface SpawnMemory {
}
interface RoomMemory {
    eSourceIds: string[];
}
interface SourceMemory {
    dptId: string;
}
