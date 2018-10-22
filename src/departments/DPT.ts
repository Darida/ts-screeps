import { uuid } from "utils/UUID";

export class DPT {
    id: string;

    constructor(id?: string) {
        this.id = id || uuid();
    }
}
