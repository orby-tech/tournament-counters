import { Table, TableRow, TableCell } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "./hooks";

export function CommandsEditor() {
  const structure = useAppSelector((state) => state.structure);


  return (
    <Table>
      {structure.commandsColumns.map((command) => {
        const persons = structure.structure[command];

        return (
          <TableRow>
            <TableCell>{command}</TableCell>
            <TableCell>
              {persons.map((person) => {
                return <TableRow>{person}</TableRow>;
              })}
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}
