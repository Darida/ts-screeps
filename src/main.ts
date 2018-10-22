import './extensions/room';
import './extensions/source';
import './extensions/creep';
import { ErrorMapper } from "utils/ErrorMapper";
import { MineDPT } from "departments/MineDPT";
import { uuid } from 'utils/UUID';

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
        source.dptId = dpt.id;
        console.log("Created new DPT for source" + source.id + ": " + dpt.id);
      }
      if (!dpiIds.includes(source.dptId))
        dpiIds.push(source.dptId);
    }
  }
  for (const creep of Object.values(Game.creeps)) {
    if (creep.dptId != null) {
      //console.log("Creep " + creep.id + " is owned by " + creep.dptId);
    } else {
      creep.dptId = dpiIds[Math.floor(Math.random() * dpiIds.length)];
      console.log("Assigning creep " + creep.id + ": " + creep.dptId);
    }
  }
  for (const creep of Object.values(Game.creeps)) {
    for (const room of Object.values(Game.rooms)) {
      for (const eSource of room.eSources) {
        if (creep.dptId == eSource.dptId) {
          harvest(creep, eSource, Game.spawns["Spawn1"]);
        }
      }
    }
  }
});

function harvest(creep: Creep, eSource: Source, eStorage: StructureSpawn) {
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

}
