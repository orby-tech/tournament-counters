import { ipcRenderer } from "electron";
import { useAppDispatch } from "../hooks";
import { setStructureState } from "../store/slices/structure.slice";
import React from "react";
import { loaded } from "../store/slices/state-controller.slice";
import { StructureState } from "../../common/models/structure.models";
import { setBaseState } from "../store/slices/base-editor.slice";
import { BaseEditorStructure } from "../../common/models/base-editor.models";
import { IPC_CLIENT_SIDE_EVENTS } from "../../common/constants/ipc-events";

function InitStateIPCControllerPure() {
  const dispatch = useAppDispatch();

  ipcRenderer.on(
    IPC_CLIENT_SIDE_EVENTS.initial_state,
    (e, e1: StructureState) => {
      dispatch(setStructureState({ type: "", payload: e1 }));
      dispatch(loaded({ type: "", payload: "" }));
    }
  );

  ipcRenderer.on(
    IPC_CLIENT_SIDE_EVENTS.initial_base_state,
    (e, e1: BaseEditorStructure) => {
      dispatch(setBaseState({ type: "", payload: e1 }));
      dispatch(loaded({ type: "", payload: "" }));
    }
  );
  return <></>;
}

export const InitStateIPCController = React.memo(InitStateIPCControllerPure);
