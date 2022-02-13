import { TableCell, TableRow } from "@mui/material";

import React from "react";
import { EvaluationType } from "../../../common/models/evaluation-type.model";
import { Rule } from "../../../common/models/rule.model";

import { CoefficientInput } from "./coefficient-input";
import { JuriesCounter } from "./juries-counter";
import { PersonSelect } from "./person-select";
import { TechnicalScore } from "./technical-score";

export function Row({ rule }: { rule: Rule }) {
  const getEvaluationType = () => {
    switch (rule) {
      case Rule.observer:
        return EvaluationType.revier;
      case Rule.revier:
        return EvaluationType.revier;
      case Rule.opposition:
        return EvaluationType.opposition;
      case Rule.reporter:
        return EvaluationType.scince;
    }
  };

  return (
    <TableRow>
      <TableCell>{rule}</TableCell>
      <TableCell>
        <PersonSelect rule={rule} />
      </TableCell>
      <TableCell>
        <CoefficientInput rule={rule} />
      </TableCell>
      <TableCell>
        <JuriesCounter rule={rule} />
      </TableCell>
      <TableCell>
        <TechnicalScore evaluationType={getEvaluationType()} />
      </TableCell>
    </TableRow>
  );
}
