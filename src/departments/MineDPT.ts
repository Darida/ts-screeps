import { DPT } from "departments/abstractDPT";

export class MineDPT extends DPT {
    constructor(id?: string) {
        super(id);
        this.Memory.type = this.constructor.name;
    }
    get Memory(): MineDPTMemory {
        return super.Memory as MineDPTMemory;
    }
    set Memory(value: MineDPTMemory) {
        super.Memory = value;
    }
    work(): void {
        for (const creepId of this.Memory.creepIds) {
            this.harvest(Game.getObjectById<Creep>(creepId), Game.getObjectById<Source>(this.Memory.eSourceId), Game.getObjectById<Structure>(this.Memory.storageId));
        }
    }

    private harvest(creep: Creep | null, eSource: Source | null, eStorage: Structure | null) {
        if (creep == null || eSource == null || eStorage == null)
            return;

        if (creep.carry.energy != creep.carryCapacity) {
            if (creep.harvest(eSource) == ERR_NOT_IN_RANGE) {
                //console.log(creep + " moving to eSource");
                creep.moveTo(eSource, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            if (creep.transfer(eStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //console.log(creep + " moving to home");
                creep.moveTo(eStorage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}
