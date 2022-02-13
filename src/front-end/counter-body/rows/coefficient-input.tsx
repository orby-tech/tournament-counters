import { Input } from "@mui/material";

import React from "react";
import { Rule } from "../../../common/models/rule.model";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setOppositionCoefficient,
  setReporterCoefficient,
  setReviewerCoefficient,
} from "../../slices/structure.slice";

export function CoefficientInput({ rule }: { rule: Rule }) {
  const structure = useAppSelector((state) => state.structure);

  const dispatch = useAppDispatch();

  const getCoefficientSetter = () => {
    switch (rule) {
      case Rule.revier:
        return setReviewerCoefficient;
      case Rule.opposition:
        return setOppositionCoefficient;
      case Rule.reporter:
        return setReporterCoefficient;
    }
  };

  const onSetCoefficient = (e: any) => {
    dispatch(
      getCoefficientSetter()({ type: "juries", payload: e.target.value })
    );
  };

  const getValue = () => {
    switch (rule) {
      case Rule.reporter:
        return structure.reporter.coefficient;
      case Rule.opposition:
        return structure.opposition.coefficient;
      case Rule.revier:
        return structure.reviewer.coefficient;
    }
  };

  return (
    <Input
      className="koefficient-input"
      type="number"
      value={getValue()}
      onChange={onSetCoefficient}
    />
  );
}
