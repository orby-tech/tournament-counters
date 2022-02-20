import { ipcRenderer } from "electron";
import { useAppDispatch } from "./../hooks";
import React from "react";
import { toast } from "react-hot-toast";
import { setBuildState } from "../store/slices/devices.slice";
import { buildAppEvents } from "../../common/constants/threads-events";

function InitDevicesIPCControllerPure() {
  const dispatch = useAppDispatch();

  for (const event of Object.values(buildAppEvents)) {
    ipcRenderer.on(event, () => {
      toast.success(event);
      dispatch(setBuildState({ type: "", payload: event }));
    });
  }

  return <></>;
}

export const InitDevicesIPCController = React.memo(
  InitDevicesIPCControllerPure
);
