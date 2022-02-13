import { Paper, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCommandsCount } from "../slices/structure.slice";

export function CommandsNumberEditor() {
  const commandsСount = useAppSelector(
    (state) => state.structure.commandsCount
  );
  const dispatch = useAppDispatch();

  const setNewValue = (e: any) =>
    dispatch(
      setCommandsCount({ type: "commandsСount", payload: e.target.value })
    );

  return (
    <Paper elevation={1} className="tournament-control">
      <InputLabel id="demo-simple-select-label">Кол-во команд</InputLabel>
      <Select
        value={commandsСount || ''}
        onChange={setNewValue}
        labelId="demo-simple-select-label"
      >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </Paper>
  );
}
