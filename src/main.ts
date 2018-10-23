import './extensions/room';
import './extensions/source';
import './extensions/creep';
import { ErrorMapper } from "utils/ErrorMapper";
import { MineDPT } from "departments/mineDPT";
import { uuid } from 'utils/UUID';
import { Government } from 'departments/government';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);
  setup();

  Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE], uuid());

  let dpiIds = [] as string[];
  for (const room of Object.values(Game.rooms)) {
    for (const source of room.eSources) {
      if (source.dptId != null) {
        //console.log("Source " + source.id + " is owned by " + source.dptId);
      } else {
        let dpt = new MineDPT();
        Government.departments[dpt.id] = dpt;
        source.dptId = dpt.id;
        dpt.Memory.eSourceId = source.id;
        dpt.Memory.storageId = Game.spawns["Spawn1"].id;
        console.log("Created new DPT for source" + source.id + ": " + dpt.id);
      }
      if (!dpiIds.includes(source.dptId))
        dpiIds.push(source.dptId);
    }
  }
  for (const creep of Object.values(Game.creeps)) {
    if (creep.id == null) // spawning. other cases ??
      continue;
    if (creep.dptId != null) {
      //console.log("Creep " + creep.id + " is owned by " + creep.dptId);
    } else {
      console.log(JSON.stringify(creep));
      creep.dptId = dpiIds[Math.floor(Math.random() * dpiIds.length)];
      let dpt = (Government.departments[creep.dptId] as MineDPT);
      dpt.Memory.creepIds = dpt.Memory.creepIds || [];
      dpt.Memory.creepIds.push(creep.id);
      console.log("Assigning creep " + creep.id + ": " + creep.dptId);
    }
  }
  for (const dpi of Object.values(Government.departments))
    dpi.work();

});

function setup() {
  /*if (Game.time % 1000 == 0) {
    console.log(`Starting from scratch! Clearing memory.`);
    Object.keys(Memory).forEach(function (key) { delete Memory[key]; });
  } else*/ {
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }

  if (Memory.sources == null)
    Memory.sources = {};
  if (Memory.departments == null)
    Memory.departments = {};

  for (let [id, dptMemory] of Object.entries(Memory.departments)) {
    switch (dptMemory.type) {
      case MineDPT.name:
        Government.departments[id] = new MineDPT(id);
        break;
    }
  }
}
