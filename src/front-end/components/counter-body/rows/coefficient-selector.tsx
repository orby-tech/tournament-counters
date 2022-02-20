import { Autocomplete, TextField } from "@mui/material";

import React from "react";
import { EVALUATIONS } from "../../../../common/constants/evaluations";
import { EvaluationType } from "../../../../common/models/evaluation-type.model";
import { JuryModel } from "../../../../common/models/jury";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setEvaluation } from "../../../store/slices/structure.slice";

export function CoefficientSelector({
  jury,
  evaluationType,
}: {
  jury: JuryModel;
  evaluationType: EvaluationType;
}) {
  const tourNumber = useAppSelector((state) => state.structure.tourNumber);
  const tours = useAppSelector((state) => state.structure.tours);
  const evaluations = tours[tourNumber].evaluations;
  const evaluationsRow = evaluations[evaluationType];

  const value = evaluationsRow[jury.id] || "";

  const dispatch = useAppDispatch();

  const selectCoefficient = (e: any, value: string) => {
    dispatch(
      setEvaluation({
        type: "Set",
        payload: {
          jury: jury,
          value: value,
          evaluationType: evaluationType,
        },
      })
    );
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={EVALUATIONS}
      sx={{ width: 80 }}
      multiple={false}
      value={value}
      inputValue={value}
      renderInput={(params) => <TextField {...params} label="k" />}
      onChange={selectCoefficient}
      clearOnBlur
      selectOnFocus
      disableClearable
    />
  );
}
