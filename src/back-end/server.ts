import { BrowserWindow, ipcMain } from "electron";
import {
  IPC_CLIENT_SIDE_EVENTS,
  IPC_SERVER_SIDE_EVENTS,
} from "../common/constants/ipc-events";
import { Device } from "../common/models/device";
import { getBuildAppWorker, getCopyAppWorker } from "./build-app";
import { getUserRuleByPassword } from "./check-password";
import { DeviceController } from "./device-controller";
import { StateController } from "./state.controller";
import { TournamentStateController } from "./tournament-state.controller";

const stateController = new StateController();
const deviceController = new DeviceController();
const tournamentStateController = new TournamentStateController();

export const initIPCServer = (mainWindow: BrowserWindow) => {
  ipcMain.on(IPC_SERVER_SIDE_EVENTS.hello, (event) => {
    event.sender.send(
      IPC_CLIENT_SIDE_EVENTS.initial_state,
      stateController.readState()
    );
    event.sender.send(
      IPC_CLIENT_SIDE_EVENTS.initial_base_state,
      stateController.readBaseState()
    );
  });

  ipcMain.on(IPC_SERVER_SIDE_EVENTS.set_state, (event, state) => {
    stateController.writeState(state);
  });

  ipcMain.on(IPC_SERVER_SIDE_EVENTS.set_base_state, (event, state) => {
    stateController.writeBaseState(state);
  });

  ipcMain.on(IPC_SERVER_SIDE_EVENTS.set_user_status, (event, state) => {
    const userRule = getUserRuleByPassword(state.password);
    if (!userRule) {
      event.sender.send(
        IPC_CLIENT_SIDE_EVENTS.change_user_status_error,
        userRule
      );
      return;
    }
    event.sender.send(IPC_CLIENT_SIDE_EVENTS.change_user_status, userRule);
  });

  ipcMain.on(IPC_SERVER_SIDE_EVENTS.get_all_devices, async function (event) {
    event.sender.send(
      IPC_CLIENT_SIDE_EVENTS.all_devices,
      deviceController.getDevices()
    );
  });

  ipcMain.on(
    IPC_SERVER_SIDE_EVENTS.select_divices_directories,
    async function (event) {
      const newPaths = await deviceController.appendDevicesDialog(mainWindow);
      event.sender.send(IPC_CLIENT_SIDE_EVENTS.new_devices, newPaths);
      event.sender.send(
        IPC_CLIENT_SIDE_EVENTS.all_devices,
        deviceController.getDevices()
      );
    }
  );

  ipcMain.on(IPC_SERVER_SIDE_EVENTS.build_app, function (event) {
    getBuildAppWorker(event);
  });

  ipcMain.on(
    IPC_SERVER_SIDE_EVENTS.write_app_to_flash,
    function (event, device: Device) {
      getCopyAppWorker(event, device.path);
    }
  );

  ipcMain.on(
    IPC_SERVER_SIDE_EVENTS.import_data_from_flash,
    function (event, device: Device) {
      try {
        tournamentStateController.importData(device);
        event.sender.send(
          IPC_CLIENT_SIDE_EVENTS.tournament_state,
          tournamentStateController.readState()
        );
      } catch (e) {}
    }
  );

  ipcMain.on(
    IPC_SERVER_SIDE_EVENTS.get_tournament_state,
    async function (event) {
      event.sender.send(
        IPC_CLIENT_SIDE_EVENTS.tournament_state,
        tournamentStateController.readState()
      );
    }
  );
};
