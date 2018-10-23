import { DPT } from "./abstractDPT";

class GovernmentImpl {
    departments: { [id: string]: DPT } = {};
}

export var Government = new GovernmentImpl();
