import { ipcMain } from "electron";
import { StateController } from "./state.controller";

const stateController = new StateController();

export const initIPCServer = () => {
  ipcMain.on("hello", (event) => {
    event.sender.send("initial-state", stateController.readState());
  });

  ipcMain.on("set-state", (event, state) => {
    stateController.writeState(state);
  });
};
