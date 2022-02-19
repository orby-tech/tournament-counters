import { ipcRenderer } from "electron";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setStructureState } from "./store/slices/structure.slice";
import React from "react";
import { loaded } from "./store/slices/state-controller.slice";
import { StructureState } from "../common/models/structure.models";
import { setBaseState } from "./store/slices/base-editor.slice";
import { BaseEditorStructure } from "../common/models/base-editor.models";

export function InitIPCController() {
  const state = useAppSelector((state) => state);
  const manualUpdated = useAppSelector(
    (state) => state.structure.manualUpdated
  );
  const baseEditorManualUpdated = useAppSelector(
    (state) => state.baseEditor.manualUpdated
  );
  const mustLoad = useAppSelector((state) => state.stateController.mustLoad);

  const dispatch = useAppDispatch();
  ipcRenderer.on("ping-good-reply", (e, e1) => {
    return;
  });

  ipcRenderer.on("initial-state", (e, e1: StructureState) => {
    dispatch(setStructureState({ type: "", payload: e1 }));
    dispatch(loaded({ type: "", payload: "" }));
  });

  ipcRenderer.on("initial-base-state", (e, e1: BaseEditorStructure) => {
    dispatch(setBaseState({ type: "", payload: e1 }));
    dispatch(loaded({ type: "", payload: "" }));
  });

  if (mustLoad) {
    ipcRenderer.send("hello", "a string", 10);
  } else if (manualUpdated) {
    ipcRenderer.send("set-state", state);
  } else if (baseEditorManualUpdated) {
    ipcRenderer.send("set-base-state", state.baseEditor);
  }

  return <></>;
}
