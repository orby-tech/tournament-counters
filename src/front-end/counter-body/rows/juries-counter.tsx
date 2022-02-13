import { TableCell, TableRow } from "@mui/material";

import React from "react";
import { useAppSelector } from "../../hooks";
import { PresentationCounters } from "./presentation-counters";
import { ScinceCounters } from "./scince-counters";
import { CoefficientSelector } from "./coefficient-selector";
import { Rule } from "../../../common/models/rule.model";
import { EvaluationType } from "../../../common/models/evaluation-type.model";

export function JuriesCounter({ rule }: { rule: Rule }) {
  const juries = useAppSelector((state) => state.structure.juries);
  const activeJuries = juries.filter((jury) => jury.active);

  if (rule === Rule.reporter) {
    return (
      <>
        <PresentationCounters />
        <ScinceCounters />
      </>
    );
  }
  return (
    <TableRow>
      <TableCell>
        <div className="evaluation-column"></div>
      </TableCell>
      {activeJuries.map((jury, index) => (
        <TableCell key={index}>
          <CoefficientSelector
            jury={jury}
            evaluationType={
              rule === Rule.opposition
                ? EvaluationType.opposition
                : EvaluationType.revier
            }
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
