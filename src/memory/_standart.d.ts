interface Memory {
    sources: { [name: string]: SourceMemory };
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
