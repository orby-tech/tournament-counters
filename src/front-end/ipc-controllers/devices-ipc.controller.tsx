import { ipcRenderer } from "electron";
import { useAppDispatch } from "./../hooks";
import React from "react";
import { toast } from "react-hot-toast";
import { setBuildState, setCopyState } from "../store/slices/devices.slice";
import {
  buildAppEvents,
  COPY_APP_EVENTS,
} from "../../common/constants/threads-events";

function InitDevicesIPCControllerPure() {
  const dispatch = useAppDispatch();

  for (const event of Object.values(buildAppEvents)) {
    ipcRenderer.on(event, () => {
      toast.success(event);
      dispatch(setBuildState({ type: "", payload: event }));
    });
  }

  for (const event of Object.values(COPY_APP_EVENTS)) {
    ipcRenderer.on(event, () => {
      toast.success(event);
      dispatch(setCopyState({ type: "", payload: event }));
    });
  }

  return <></>;
}

export const InitDevicesIPCController = React.memo(
  InitDevicesIPCControllerPure
);
