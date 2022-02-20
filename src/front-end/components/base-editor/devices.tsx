import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
  Button,
} from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddDevices } from "./add-device";
import { ipcRenderer } from "electron";
import { Device } from "../../../common/models/device";
import { setDevices } from "../../../front-end/store/slices/devices.slice";
import { toast } from "react-hot-toast";

export const COLORS = {
  liteGreen: "#69e169",
  liteRed: "#df8963",
};

function UsedEarly({ usedEarly }: { usedEarly: boolean }) {
  if (usedEarly) {
    return <Box sx={{ backgroundColor: COLORS.liteGreen }}>Использовано</Box>;
  }
  return <Box sx={{ backgroundColor: COLORS.liteRed }}>Не исользовано</Box>;
}

function ActualDatabase({ actualDatabase }: { actualDatabase: boolean }) {
  if (actualDatabase) {
    return <Box sx={{ backgroundColor: COLORS.liteGreen }}>Актуальна</Box>;
  }
  return <Box sx={{ backgroundColor: COLORS.liteRed }}>Не актуальна</Box>;
}

function DatabaseFromOldTournament({
  databaseFromOldTournament,
}: {
  databaseFromOldTournament: boolean;
}) {
  if (!databaseFromOldTournament) {
    return <Box sx={{ backgroundColor: COLORS.liteGreen }}>Чисто</Box>;
  }
  return (
    <Box sx={{ backgroundColor: COLORS.liteRed }}>
      Остались данные с последнего турнира
    </Box>
  );
}

function DevicesPure() {
  const devicesLoaded =
    useAppSelector<boolean>((state) => state.devicesSlice.loaded) || false;
  const devices =
    useAppSelector<Device[]>((state) => state.devicesSlice.devices) || [];

  const dispatch = useAppDispatch();

  ipcRenderer.on("all-devices", (e, e1: Device[]) => {
    dispatch(setDevices({ type: "", payload: e1 }));
  });
  ipcRenderer.on("build-app-finish", (e) => {
    toast("App  builded");
  });
  ipcRenderer.on("write-app-to-flash-finish", (e, e1: Device) => {
    toast(`App writed to ${e1.path}`);
  });

  if (!devicesLoaded) {
    ipcRenderer.send("get-all-devices");
  }

  const buildApp = () => {
    ipcRenderer.send("build-app");
  };

  const writeAppToFlash = (flash: Device) => {
    ipcRenderer.send("write-app-to-flash", flash);
  };
  return (
    <>
      <AddDevices />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Путь </TableCell>
            <TableCell>Использована ранее</TableCell>
            <TableCell>Актуальность базы данных</TableCell>
            <TableCell>Есть ли данные с прошлого турнира?</TableCell>
            <TableCell>
              <Button onClick={buildApp}> Собрать приложение</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => {
            return (
              <TableRow key={device.id}>
                <TableCell> {device.path}</TableCell>
                <TableCell>
                  <UsedEarly usedEarly={device.usedEarly} />
                </TableCell>
                <TableCell>
                  <ActualDatabase actualDatabase={device.actualDatabase} />
                </TableCell>
                <TableCell>
                  <DatabaseFromOldTournament
                    databaseFromOldTournament={device.databaseFromOldTournament}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => writeAppToFlash(device)}>
                    Записать приложение
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export const Devices = React.memo(DevicesPure);
