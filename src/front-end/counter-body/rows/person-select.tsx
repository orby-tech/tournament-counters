import { Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectOppositionPerson,
  selectReporterPerson,
  selectReviewerPerson,
  usersOprtions,
} from "../../slices/structure.slice";

import { TablesStructure } from "../../../front-end/constants/tables";
import { Rule } from "../../../common/models/rule.model";

export function PersonSelect({ rule }: { rule: Rule }) {
  const dispatch = useAppDispatch();

  const structure = useAppSelector((state) => state.structure);
  const tourNumber = useAppSelector((state) => state.structure.tourNumber);

  const getSetter = () => {
    switch (rule) {
      case Rule.revier:
        return selectReviewerPerson;
      case Rule.opposition:
        return selectOppositionPerson;
      case Rule.reporter:
        return selectReporterPerson;
    }
  };

  const onSelectPerson = (e: SelectChangeEvent<unknown>) => {
    dispatch(getSetter()({ type: "juries", payload: e.target.value }));
  };

  const table = TablesStructure[structure.commandsCount];

  const tourRow = table[tourNumber - 1];
  const index = tourRow
    .map((item) => {
      if (item === rule) {
        return true;
      }

      if (Array.isArray(item)) {
        return !!item.find((item) => item === rule);
      }
      return false;
    })
    .indexOf(true);

  const command = structure.commandsColumns[index];

  const getValue = () => {
    switch (rule) {
      case Rule.reporter:
        return structure.reporter.person;
      case Rule.opposition:
        return structure.opposition.person;
      case Rule.revier:
        return structure.reviewer.person;

      default:
        return "";
    }
  };

  return (
    <>
      {" "}
      <InputLabel id="demo-simple-select-label">{command}</InputLabel>
      <Select
        value={getValue()}
        onChange={onSelectPerson}
        label={command}
        labelId="demo-simple-select-label"
      >
        {usersOprtions(structure, command).map((option, index) => {
          return (
            <MenuItem value={option.value} key={index}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
