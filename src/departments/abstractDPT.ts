import { uuid } from "utils/UUID";

export abstract class DPT {
    id: string;

    constructor(id?: string) {
        this.id = id || uuid();
    }
    get Memory(): DPTMemory {
        const _this: DPT = this;
        if (Memory.departments[_this.id] == null)
            Memory.departments[_this.id] = {} as DPTMemory;
        return Memory.departments[_this.id];
    }
    set Memory(value: DPTMemory) {
        const _this: DPT = this;
        Memory.departments[_this.id] = value;
    }
    abstract work(): void;
}
