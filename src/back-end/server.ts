import { BrowserWindow, ipcMain, dialog } from "electron";
import { Device } from "../common/models/device";
import { buildAppIPC, copyWindowsPackageToPath } from "./build-app";
import { getUserRuleByPassword } from "./check-password";
import { DeviceController } from "./device-controller";
import { StateController } from "./state.controller";

const stateController = new StateController();
const deviceController = new DeviceController();

export const initIPCServer = (mainWindow: BrowserWindow) => {
  ipcMain.on("hello", (event) => {
    event.sender.send("initial-state", stateController.readState());
    event.sender.send("initial-base-state", stateController.readBaseState());
  });

  ipcMain.on("set-state", (event, state) => {
    stateController.writeState(state);
  });

  ipcMain.on("set-base-state", (event, state) => {
    stateController.writeBaseState(state);
  });

  ipcMain.on("set-user-status", (event, state) => {
    const userRule = getUserRuleByPassword(state.password);
    if (!userRule) {
      event.sender.send("change-user-status-error", userRule);
      return;
    }
    event.sender.send("change-user-status", userRule);
  });

  ipcMain.on("get-all-devices", async function (event) {
    event.sender.send("all-devices", deviceController.getDevices());
  });

  ipcMain.on("select-divices-directories", async function (event) {
    const newPaths = await deviceController.appendDevicesDialog(mainWindow);

    event.sender.send("new-devices", newPaths);
    event.sender.send("all-devices", deviceController.getDevices());
  });

  ipcMain.on("build-app", function (event) {
    buildAppIPC(event);
  });

  ipcMain.on("write-app-to-flash", async function (event, device: Device) {
    await copyWindowsPackageToPath(device.path);
    event.sender.send("write-app-to-flash-finish", device);
  });
};
