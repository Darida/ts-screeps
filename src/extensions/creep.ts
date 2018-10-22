Object.defineProperty(Creep.prototype, "dptId", {
    get(): string {
        const _this: Creep = this;
        return _this.memory.dptId;
    },
    set(value: string): void {
        const _this: Creep = this;
        _this.memory.dptId = value;
    }
});
