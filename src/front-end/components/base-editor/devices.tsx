import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
} from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddDevices } from "./add-device";
import { ipcRenderer } from "electron";
import { Device } from "../../../common/models/device";
import { setDevices } from "../../../front-end/store/slices/devices.slice";

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
  if (!devicesLoaded) {
    ipcRenderer.send("get-all-devices");
  }
  console.log(devices);
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
            <TableCell> Записать приложение в директорию </TableCell>
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
                  {" "}
                  <DatabaseFromOldTournament
                    databaseFromOldTournament={device.databaseFromOldTournament}
                  />{" "}
                </TableCell>
                <TableCell> write app </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export const Devices = React.memo(DevicesPure);
