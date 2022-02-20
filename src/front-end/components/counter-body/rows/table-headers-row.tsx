import { Button, TableCell, TableRow } from "@mui/material";

import React from "react";
import { useAppSelector } from "../../../hooks";

export function JuriesHeadersRow() {
  const juries = useAppSelector((state) => state.structure.juries);

  const activeJuries = juries.filter((jury) => jury.active);

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        <TableRow>
          <TableCell className="evaluation-header"></TableCell>
          {activeJuries.map((jury, index) => (
            <TableCell className="evaluation" key={index}>
              <Button className="koefficient-input"> {jury.title} </Button>
            </TableCell>
          ))}
        </TableRow>
      </TableCell>
    </TableRow>
  );
}
