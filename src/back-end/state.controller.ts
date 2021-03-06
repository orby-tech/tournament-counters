import fs from "fs";
import { StoreState } from "../common/models/store-state";
import { ActualDataState } from "../common/models/actual-data.models";
import { getInitialState } from "../common/get-state";
import { getBaseState } from "../common/get-base-state";
import { StructureState } from "../common/models/structure.models";
import { BaseEditorStructure } from "../common/models/base-editor.models";

export class StateController {
  private writeStateTimer: NodeJS.Timeout | null = null;
  private databaseDirectory = "./database/";
  private actualDatabaseName = "actual-data.json";

  constructor() {
    this.createDatabaseDirectory(this.databaseDirectory);
  }

  readState(): StructureState {
    const actualDatabaseName = this.getActualDatabaseName();
    if (!actualDatabaseName) {
      return getInitialState();
    }
    const state = this.readFile<StoreState>(
      `${this.databaseDirectory}${actualDatabaseName}`
    );
    if (!state) {
      return getInitialState();
    }

    const actualState = this.readFile<ActualDataState>(
      `${this.databaseDirectory}${this.actualDatabaseName}`
    );

    return {
      ...state.structure,
      sectionNumber: actualState.sectionNumber,
    };
  }

  readBaseState(): BaseEditorStructure {
    const state = this.readFile<BaseEditorStructure>(
      `${this.databaseDirectory}${"base-info.json"}`
    );
    if (!state) {
      return getBaseState();
    }

    return state;
  }

  writeState(state: StoreState) {
    clearTimeout(this.writeStateTimer);
    this.writeStateTimer = setTimeout(() => {
      this.writeActualDatabase(state);

      this.writeFile(
        `${this.databaseDirectory}${this.getActualDatabaseName()}`,
        state
      );
    }, 200);
  }
  
  writeBaseState(state: BaseEditorStructure) {
    clearTimeout(this.writeStateTimer);
    this.writeStateTimer = setTimeout(() => {
      this.writeFile(`${this.databaseDirectory}${"base-info.json"}`, state);
    }, 200);
  }

  getActualDatabaseName(): string {
    const actualState = this.readFile<ActualDataState>(
      `${this.databaseDirectory}${this.actualDatabaseName}`
    );
    if (!actualState) {
      return;
    }
    return `stage-${actualState.stageNumber}_tour-${actualState.tourNumber}.json`;
  }

  writeActualDatabase(state: StoreState) {
    const actualData = {
      tourNumber: state.structure.tourNumber,
      sectionNumber: state.structure.sectionNumber,
      stageNumber: state.structure.stageNumber,
    } as ActualDataState;
    this.writeFile(
      `${this.databaseDirectory}${this.actualDatabaseName}`,
      actualData
    );
  }

  private readFile<T>(filename: string): T {
    try {
      return JSON.parse(fs.readFileSync(filename, "utf8"));
    } catch (err) {
      console.error(`Error reading file from disk: ${err}`);
    }
  }

  private writeFile<T>(filename: string, data: T) {
    fs.writeFileSync(filename, JSON.stringify(data));
  }

  private createDatabaseDirectory(directory: string) {
    try {
      fs.mkdirSync(directory);
    } catch (e) {
      console.error(e);
    }
  }
}
