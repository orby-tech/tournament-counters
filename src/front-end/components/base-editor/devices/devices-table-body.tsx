import { TableBody } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../../hooks";
import { Device } from "../../../../common/models/device";
import { DevicesTableRow } from "./devices-table-row";

export function DevicesTableBody() {
  const devices =
    useAppSelector<Device[]>((state) => state.devicesSlice.devices) || [];

  return (
    <TableBody>
      {devices.map((device) => {
        return <DevicesTableRow device={device} />;
      })}
    </TableBody>
  );
}
