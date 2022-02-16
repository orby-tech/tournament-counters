import { ipcRenderer } from "electron";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setStructureState } from "./store/slices/structure.slice";
import React from "react";
import { loaded } from "./store/slices/state-controller.slice";
import { StoreState } from "../common/models/store-state";

export function InitIPCController() {
  const state = useAppSelector((state) => state);
  const manualUpdated = useAppSelector(
    (state) => state.structure.manualUpdated
  );
  const mustLoad = useAppSelector((state) => state.stateController.mustLoad);

  const dispatch = useAppDispatch();
  ipcRenderer.on("ping-good-reply", (e, e1) => {
    return;
  });

  ipcRenderer.on("initial-state", (e, e1: StoreState) => {
    dispatch(
      setStructureState({ type: "commandsСount", payload: e1.structure })
    );
    dispatch(loaded({ type: "commandsСount", payload: "" }));
  });

  if (mustLoad) {
    ipcRenderer.send("hello", "a string", 10);
  } else if (manualUpdated) {
    ipcRenderer.send("set-state", state);
  }

  return <></>;
}
