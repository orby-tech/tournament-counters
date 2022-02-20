import { Button } from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { toast } from "react-hot-toast";

function AddDevicesPure() {
  const dirClick = (e: any) => {
    ipcRenderer.send("select-divices-directories");
  };

  ipcRenderer.on("new-devices", (e, paths: string[]) => {
    paths.map((path) => toast(path));
  });

  return <Button onClick={dirClick}> Выбрать директории устройств </Button>;
}
export const AddDevices = React.memo(AddDevicesPure);
