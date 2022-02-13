import React from "react";
import { TableHead, TableCell, TableRow } from "@material-ui/core";
export function CounterBodyTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Роль</TableCell>
        <TableCell>Команда / Участник</TableCell>
        <TableCell>Коэффициент</TableCell>
        <TableCell>Оценки</TableCell>
        <TableCell> Технический балл</TableCell>
      </TableRow>
    </TableHead>
  );
}
