import { BrowserWindow, dialog } from "electron";
import { Device, EmptyDevice } from "../common/models/device";
import fs from "fs";

import { v4 as uuidv4 } from "uuid";

export class DeviceController {
  devices = [] as EmptyDevice[];

  getDevices(): Device[] {
    return this.devices.map((device) => this.getDevice(device));
  }

  private getDevice(device: EmptyDevice): Device {
    return {
      ...device,
      usedEarly: this.isUsedEarly(device),
      actualDatabase: this.isActualDatabase(device),
      databaseFromOldTournament: this.isDatabaseFromOldTournament(device),
    };
  }

  private isUsedEarly(device: EmptyDevice): boolean {
    const devicePathList = fs.readdirSync(device.path);
    let usedEarly = false;
    if (devicePathList.includes("counter-app")) {
      const counterAppPathList = fs.readdirSync(device.path + "/counter-app");
      if (counterAppPathList.includes("database")) {
        usedEarly = true;
      }
    }
    return usedEarly;
  }

  private isActualDatabase(device: EmptyDevice): boolean {
    let fromDevice = "";
    try {
      fromDevice = fs.readFileSync(
        `${device.path}/counter-app/database/${"base-info.json"}`,
        "utf8"
      );
    } catch (e) {
      return false;
    }

    let fromLocal = "";
    try {
      fromLocal = fs.readFileSync(`./database/${"base-info.json"}`, "utf8");
    } catch (e) {
      return false;
    }

    return fromDevice === fromLocal;
  }

  private isDatabaseFromOldTournament(device: EmptyDevice): boolean {
    try {
      return (
        fs.readdirSync(
          `${device.path}/counter-app/database/`
        ).length > 2
      );
    } catch (e) {
      return false;
    }
  }

  async appendDevicesDialog(mainWindow: BrowserWindow) {
    const dir = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory", "multiSelections"],
    });

    if (dir?.canceled) {
      return;
    }
    const paths = dir.filePaths;

    const filteredPaths = paths.filter(
      (path) => !this.devices.find((device) => device.path === path)
    );
    this.devices = [
      ...this.devices,
      ...filteredPaths.map((path) => ({ id: uuidv4(), path: path })),
    ];

    return filteredPaths;
  }
}
