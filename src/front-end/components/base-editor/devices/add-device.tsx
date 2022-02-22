import { Button } from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { toast } from "react-hot-toast";
import {
  IPC_SERVER_SIDE_EVENTS,
  IPC_CLIENT_SIDE_EVENTS,
} from "../../../../common/constants/ipc-events";
import { locMap } from "../../../locale/i18n";
import { useTranslation } from "react-i18next";

function AddDevicesPure() {
  const { t } = useTranslation();

  const dirClick = (e: any) => {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.select_divices_directories);
  };

  ipcRenderer.on(IPC_CLIENT_SIDE_EVENTS.new_devices, (e, paths: string[]) => {
    console.log(20);
    paths.map((path) => toast(path));
  });

  return (
    <Button onClick={dirClick}> {t(locMap.buttons.select_devices)} </Button>
  );
}

export const AddDevices = React.memo(AddDevicesPure);
