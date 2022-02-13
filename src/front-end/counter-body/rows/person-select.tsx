import { Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectOppositionPerson,
  usersOprtions,
} from "../../slices/structure.slice";

import { TablesStructure } from "../../../front-end/constants/tables";
import { Rule } from "../../../common/models/rule.model";

export function PersonSelect({ rule }: { rule: Rule }) {
  const dispatch = useAppDispatch();

  const structure = useAppSelector((state) => state.structure);
  const tourNumber = useAppSelector(
    (state) => state.structure.tourNumber
  );
  const onSelectPerson = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      selectOppositionPerson({ type: "juries", payload: e.target.value })
    );
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
  return (
    <>
      {" "}
      <InputLabel id="demo-simple-select-label">{command}</InputLabel>
      <Select
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
