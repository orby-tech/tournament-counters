import { Paper, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setJuriesCount } from "../../store/slices/structure.slice";

export function JuryNumberEditor() {
  const juryNumber = useAppSelector((state) => state.structure.juries).filter(
    (jury) => jury.active
  ).length;
  const dispatch = useAppDispatch();

  const setNewValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => dispatch(setJuriesCount({ type: "juryNumber", payload: e.target.value }));

  return (
    <Paper elevation={1} className="tournament-control">
      <TextField
        label="Кол-во жюри"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={juryNumber}
        onChange={setNewValue}
      />
    </Paper>
  );
}
