import { TableRow, TableCell, TableHead } from "@mui/material";
import * as React from "react";
import { locMap } from "../../../locale/i18n";
import { useTranslation } from "react-i18next";
import { BuildAppButton } from "./build-app-button";

export function DevicesTableHeader() {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell>{t(locMap.headers.way)} </TableCell>
        <TableCell>{t(locMap.headers.early_used)}</TableCell>
        <TableCell>{t(locMap.headers.actual_database)}</TableCell>
        <TableCell>{t(locMap.headers.database_from_old_tournament)}</TableCell>
        <TableCell>
          <BuildAppButton />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
