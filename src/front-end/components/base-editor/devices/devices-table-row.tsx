import { TableRow, TableCell } from "@mui/material";
import * as React from "react";
import { Device } from "../../../../common/models/device";

import { UsedEarly } from "./../used-early";
import { ActualDatabase } from "./../actual_database";
import { DatabaseFromOldTournament } from "./../data-base-from-old-tournament";
import { CopyToDeviceButton } from "./copy-to-device-button";

export function DevicesTableRow({ device }: { device: Device }) {
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
        <DatabaseFromOldTournament device={device} />
      </TableCell>
      <TableCell>
        <CopyToDeviceButton device={device} />
      </TableCell>
    </TableRow>
  );
}
