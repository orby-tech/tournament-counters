import { TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
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
