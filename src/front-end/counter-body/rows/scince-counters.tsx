import { TableRow, TableCell } from "@mui/material";
import React from "react";
import { EvaluationType } from "../../../common/models/evaluation-type.model";
import { useAppSelector } from "../../hooks";
import { CoefficientSelector } from "./coefficient-selector";

export function ScinceCounters() {
  const juries = useAppSelector((state) => state.structure.juries);

  const activeJuries = juries.filter((jury) => jury.active);

  return (
    <TableRow>
      <TableCell className="evaluation-header">
        <div> Научная часть </div>
      </TableCell>
      {activeJuries.map((jury, index) => (
        <TableCell className="evaluation" key={index}>
          <CoefficientSelector
            jury={jury}
            evaluationType={EvaluationType.scince}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
