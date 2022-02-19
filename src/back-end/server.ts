import { ipcMain } from "electron";
import { getUserRuleByPassword } from "./check-password";
import { StateController } from "./state.controller";

const stateController = new StateController();

export const initIPCServer = () => {
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
      return
    }
    event.sender.send("change-user-status", userRule);
  });
};
