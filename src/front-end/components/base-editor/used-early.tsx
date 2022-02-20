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
import { AddDevices } from "./devices/add-device";
import { ipcRenderer } from "electron";
import { Device } from "../../../common/models/device";
import { setDevices } from "../../../front-end/store/slices/devices.slice";
import { toast } from "react-hot-toast";
import {
  IPC_SERVER_SIDE_EVENTS,
  IPC_CLIENT_SIDE_EVENTS,
} from "../../../common/constants/ipc-events";
import { locMap } from "../../../front-end/locale/i18n";
import { useTranslation } from "react-i18next";

export const COLORS = {
  liteGreen: "#69e169",
  liteRed: "#df8963",
};

export function UsedEarly({ usedEarly }: { usedEarly: boolean }) {
  if (usedEarly) {
    return <Box sx={{ backgroundColor: COLORS.liteGreen }}>Использовано</Box>;
  }
  return <Box sx={{ backgroundColor: COLORS.liteRed }}>Не исользовано</Box>;
}
