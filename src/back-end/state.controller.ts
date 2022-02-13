import fs from "fs";
import { StoreState } from "../common/models/store-state";
import { ActualDataState } from "../common/models/actual-data.models";
import { getInitialState } from "../common/get-state";

export class StateController {
  private writeStateTimer: NodeJS.Timeout | null = null;
  private databaseDirectory = "./database/";
  private actualDatabaseName = "actual-data.json";

  constructor() {
    this.createDatabaseDirectory(this.databaseDirectory);
  }

  readState(): StoreState {
    const actualDatabaseName = this.getActualDatabaseName();
    if (!actualDatabaseName) {
      return { structure: getInitialState() };
    }
    const state = this.readFile<StoreState>(
      `${this.databaseDirectory}${actualDatabaseName}`
    );
    if (!state) {
      return { structure: getInitialState() };
    }

    const actualState = this.readFile<ActualDataState>(
      `${this.databaseDirectory}${this.actualDatabaseName}`
    );

    return {
      structure: {
        ...state.structure,
        sectionNumber: actualState.sectionNumber,
      },
    };
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
    console.log(actualData, state);
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
