import { TableRow, TableCell, Button } from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { Device } from "../../../../common/models/device";
import { IPC_SERVER_SIDE_EVENTS } from "../../../../common/constants/ipc-events";
import { locMap } from "../../../../front-end/locale/i18n";
import { useTranslation } from "react-i18next";
import { UsedEarly } from "./../used-early";
import { ActualDatabase } from "./../actual_database";
import { DatabaseFromOldTournament } from "./../data-base-from-old-tournament";

export function DevicesTableRow({ device }: { device: Device }) {
  const { t } = useTranslation();

  const writeAppToFlash = (flash: Device) => {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.write_app_to_flash, flash);
  };

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
          {t(locMap.buttons.write_app)}
        </Button>
      </TableCell>
    </TableRow>
  );
}
