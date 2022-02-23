import fs from "fs";
import { ActualDataState } from "../common/models/actual-data.models";
import { Device } from "../common/models/device";
import { StoreState } from "../common/models/store-state";
import { TournamentState } from "../common/models/structure.models";

export class TournamentStateController {
  private writeStateTimer: NodeJS.Timeout | null = null;
  private databaseDirectory = "./database/";

  constructor() {
    this.createDatabaseDirectory(this.databaseDirectory);
  }

  importData = (device: Device) => {
    const path = `${device.path}/counter-app/${this.databaseDirectory}`;
    const filenames = fs.readdirSync(
      `${device.path}/counter-app/${this.databaseDirectory}`
    );
    if (!filenames) {
      return "no files";
    }

    const stagesFilenames = filenames.filter((name) =>
      /stage-[0-9]+_tour-[0-9]+.json/.test(name)
    );
    const actualState = this.readFile<ActualDataState>(
      `${path}/actual-data.json`
    );

    const section = {
      sectionNumber: actualState.sectionNumber,
      states: stagesFilenames.map((name) => {
        return this.readFile<StoreState>(`${path}/${name}`).structure;
      }),
    };

    const stateNow = this.readState();

    this.writeStateSync({
      sections: [...stateNow.sections, section],
    });
  };

  readState(): TournamentState {
    const state = this.readFile<TournamentState>(
      `${this.databaseDirectory}${"tournament-state.json"}`
    );
    if (!state) {
      return { sections: [] };
    }
    return state;
  }

  writeState(state: TournamentState) {
    clearTimeout(this.writeStateTimer);
    this.writeStateTimer = setTimeout(() => {
      this.writeFile(
        `${this.databaseDirectory}${"tournament-state.json"}`,
        state
      );
    }, 200);
  }

  writeStateSync(state: TournamentState) {
    this.writeFile(
      `${this.databaseDirectory}${"tournament-state.json"}`,
      state
    );
  }

  private getActualDatabaseName(actualState: ActualDataState): string {
    return `stage-${actualState.stageNumber}_tour-${actualState.tourNumber}.json`;
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
