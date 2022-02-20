import { ipcRenderer } from "electron";
import { useAppSelector } from "../hooks";
import React from "react";
import { IPC_SERVER_SIDE_EVENTS } from "../../common/constants/ipc-events";
import { InitDevicesIPCController } from "./devices-ipc.controller";
import { InitStateIPCController } from "./state-ipc.controller";

function InitIPCControllerPure() {
  const state = useAppSelector((state) => state);
  const manualUpdated = useAppSelector(
    (state) => state.structure.manualUpdated
  );
  const baseEditorManualUpdated = useAppSelector(
    (state) => state.baseEditor.manualUpdated
  );
  const mustLoad = useAppSelector((state) => state.stateController.mustLoad);

  if (mustLoad) {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.hello, "a string", 10);
  } else if (manualUpdated) {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.set_state, state);
  } else if (baseEditorManualUpdated) {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.set_base_state, state.baseEditor);
  }

  return (
    <>
      <InitStateIPCController />
      <InitDevicesIPCController />
    </>
  );
}

export const InitIPCController = React.memo(InitIPCControllerPure);
