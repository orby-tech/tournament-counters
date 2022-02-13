import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCommandsColumns } from "../slices/structure.slice";
import { TablesStructure } from "../constants/tables";
import { commandsList } from "../slices/controllers/commands.controller";

export function TourMapTable() {
  const commandsСount = useAppSelector(
    (state) => state.structure.commandsCount
  );

  const structure = useAppSelector((state) => state.structure);
  const dispatch = useAppDispatch();

  const onSelectCommand = (e: any, columnNumber: number) => {
    const columns = [...structure.commandsColumns];
    columns[columnNumber] = e.target.value;
    dispatch(setCommandsColumns({ type: "commandsСount", payload: columns }));
  };

  const table = TablesStructure[commandsСount];
  if (!table) {
    return <></>;
  }
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {table.map((raw, index) => {
              return (
                <TableCell key={index}>
                  {" "}
                  <Select
                    onChange={(e) => onSelectCommand(e, index)}
                    value={structure.commandsColumns[index] || ""}
                  >
                    {commandsList(structure).map((option, index) => {
                      return (
                        <MenuItem
                          value={option.value}
                          disabled={option.disabled}
                          key={index}
                        >
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {row.map((cell, index) => {
                  return (
                    <TableCell key={index}>
                      {Array.isArray(cell) ? cell.join(" + ") : cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
