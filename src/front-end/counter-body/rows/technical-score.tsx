import { TableCell, TableRow } from "@mui/material";

import React from "react";
import { useAppSelector } from "../../hooks";
import { Rule } from "../../../common/models/rule.model";
import { EvaluationType } from "../../../common/models/evaluation-type.model";
import { EVALUATION_VALUES } from "../../../common/constants/evaluations";

export function TechnicalScore({
  evaluationType,
}: {
  evaluationType: EvaluationType;
}) {
  const juries = useAppSelector((state) => state.structure.juries);
  const tours = useAppSelector((state) => state.structure.tours);
  const tourNumber = useAppSelector((state) => state.structure.tourNumber);
  const activeJuries = juries.filter((jury) => jury.active);

  let technicalScore = 0;

  if (
    evaluationType === EvaluationType.presentation ||
    evaluationType === EvaluationType.scince
  ) {
    activeJuries.forEach((jury) => {
      technicalScore +=
        EVALUATION_VALUES[
          tours[tourNumber].evaluations[EvaluationType.presentation][jury.id]
        ] || 0;
      technicalScore +=
        EVALUATION_VALUES[
          tours[tourNumber].evaluations[EvaluationType.scince][jury.id]
        ] || 0;
    });
  } else {
    activeJuries.forEach((jury) => {
      technicalScore +=
        EVALUATION_VALUES[
          tours[tourNumber].evaluations[evaluationType][jury.id]
        ] || 0;
    });
  }

  technicalScore *= 1 / activeJuries.length;
  technicalScore = Math.ceil(technicalScore);

  if (
    evaluationType === EvaluationType.presentation ||
    evaluationType === EvaluationType.scince ||
    evaluationType === EvaluationType.opposition
  ) {
    technicalScore *= 2;
  }

  return (
    <TableRow>
      <TableCell>
        <div className="evaluation-column">{technicalScore}</div>
      </TableCell>
    </TableRow>
  );
}
