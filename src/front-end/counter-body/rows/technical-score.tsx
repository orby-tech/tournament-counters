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
  const structure = useAppSelector((state) => state.structure);
  const tourNumber = useAppSelector((state) => state.structure.tourNumber);
  const activeJuries = juries.filter((jury) => jury.active);

  let technicalScore = 0;

  const getCoefficient = () => {
    switch (evaluationType) {
      case EvaluationType.opposition:
        return structure.opposition.coefficient;
      case EvaluationType.revier:
        return structure.reviewer.coefficient;
      case EvaluationType.presentation:
        return structure.reporter.coefficient;
      case EvaluationType.scince:
        return structure.reporter.coefficient;
    }
  };

  if (
    evaluationType === EvaluationType.presentation ||
    evaluationType === EvaluationType.scince
  ) {
    activeJuries.forEach((jury) => {
      technicalScore +=
        EVALUATION_VALUES[
          tours[tourNumber].evaluations[EvaluationType.presentation][jury.id]
        ] * getCoefficient() || 0;
      technicalScore +=
        EVALUATION_VALUES[
          tours[tourNumber].evaluations[EvaluationType.scince][jury.id]
        ] * getCoefficient() || 0;
    });
  } else {
    activeJuries.forEach((jury) => {
      technicalScore +=
        EVALUATION_VALUES[
          tours[tourNumber].evaluations[evaluationType][jury.id]
        ] * getCoefficient() || 0;
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
