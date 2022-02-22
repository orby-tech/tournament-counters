import { Table } from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AddDevices } from "./add-device";
import { ipcRenderer } from "electron";
import { Device } from "../../../../common/models/device";
import { setDevices } from "../../../../front-end/store/slices/devices.slice";
import { toast } from "react-hot-toast";
import {
  IPC_SERVER_SIDE_EVENTS,
  IPC_CLIENT_SIDE_EVENTS,
} from "../../../../common/constants/ipc-events";
import { DevicesTableHeader } from "./devices_table_header";
import { DevicesTableBody } from "./devices-table-body";

function DevicesPure() {
  const devicesLoaded =
    useAppSelector<boolean>((state) => state.devicesSlice.loaded) || false;

  const dispatch = useAppDispatch();

  ipcRenderer.on(IPC_CLIENT_SIDE_EVENTS.all_devices, (e, e1: Device[]) => {
    console.log(e1);
    dispatch(setDevices({ type: "", payload: e1 }));
  });
  ipcRenderer.on(IPC_CLIENT_SIDE_EVENTS.build_app_finish, (e) => {
    toast.success("App builded");
  });

  ipcRenderer.on(
    IPC_CLIENT_SIDE_EVENTS.write_app_to_flash_finish,
    (e, e1: Device) => {
      toast.success(`App writed to ${e1.path}`);
    }
  );

  if (!devicesLoaded) {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.get_all_devices);
  }

  return (
    <>
      <AddDevices />
      <Table>
        <DevicesTableHeader />
        <DevicesTableBody />
      </Table>
    </>
  );
}

export const Devices = React.memo(DevicesPure);
