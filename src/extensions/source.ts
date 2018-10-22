Object.defineProperty(Source.prototype, "memory", {
    get(): SourceMemory {
        const _this: Source = this;
        if (Memory.sources[_this.id] == null)
            Memory.sources[_this.id] = {} as SourceMemory;
        return Memory.sources[_this.id];
    },
    set(value: SourceMemory): void {
        const _this: Source = this;
        Memory.sources[_this.id] = value;
    }
});
Object.defineProperty(Source.prototype, "dptId", {
    get(): string {
        const _this: Source = this;
        return _this.memory.dptId;
    },
    set(value: string): void {
        const _this: Source = this;
        _this.memory.dptId = value;
    }
});
