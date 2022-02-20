import { Button } from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { Device } from "../../../common/models/device";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../../front-end/hooks";
import { setDevices } from "../../../front-end/store/slices/devices.slice";

function AddDevicesPure() {
  const dirClick = (e: any) => {
    ipcRenderer.send("select-divices-directories");
  };

  const dispatch = useAppDispatch();

  ipcRenderer.on("new-devices", (e, paths: string[]) => {
    paths.map((path) => toast(path));
  });

  return <Button onClick={dirClick}> Выбрать директории устройств </Button>;
}
export const AddDevices = React.memo(AddDevicesPure);
