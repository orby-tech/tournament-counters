import { TableRow, TableCell, TableHead, Button } from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { IPC_SERVER_SIDE_EVENTS } from "../../../../common/constants/ipc-events";
import { locMap } from "../../../locale/i18n";
import { useTranslation } from "react-i18next";

export const COLORS = {
  liteGreen: "#69e169",
  liteRed: "#df8963",
};

export function DevicesTableHeader() {
  const { t } = useTranslation();

  const buildApp = () => {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.build_app);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>{t(locMap.headers.way)} </TableCell>
        <TableCell>{t(locMap.headers.early_used)}</TableCell>
        <TableCell>{t(locMap.headers.actual_database)}</TableCell>
        <TableCell>{t(locMap.headers.database_from_old_tournament)}</TableCell>
        <TableCell>
          <Button onClick={buildApp}> {t(locMap.buttons.build_app)}</Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
