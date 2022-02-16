import { Paper, TextField } from "@mui/material";
import React from "react";
import { setSectionNumber } from "../../store/slices/structure.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function SectionNumberEditor() {
  const sectionNumber = useAppSelector(
    (state) => state.structure.sectionNumber
  );
  const dispatch = useAppDispatch();

  const setNewValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    dispatch(
      setSectionNumber({ type: "sectionNumber", payload: e.target.value })
    );

  return (
    <Paper elevation={1} className="tournament-control">
      <TextField
        label="Номер секции"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={sectionNumber}
        onChange={setNewValue}
      />
    </Paper>
  );
}
