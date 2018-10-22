Object.defineProperty(Room.prototype, "eSourceIds", {
    get(): String[] {
        const _this: Room = this;
        if (_this.memory.eSourceIds == null) {
            _this.memory.eSourceIds = [];
            for (const eSource of _this.find(FIND_SOURCES)) {
                _this.memory.eSourceIds.push(eSource.id);
            }
        }
        return _this.memory.eSourceIds;
    }
});

Object.defineProperty(Room.prototype, "eSources", {
    get(): Source[] {
        const _this: Room = this;
        return _this.eSourceIds.map(id => Game.getObjectById<Source>(id)).filter((x): x is Source => x !== null);
    }
});
