import { Paper, TextField } from "@mui/material";
import React from "react";
import { setStageNumber } from "../../store/slices/structure.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function StageNumberEditor() {
  const stageNumber = useAppSelector((state) => state.structure.stageNumber);
  const dispatch = useAppDispatch();

  const setNewValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    dispatch(setStageNumber({ type: "stageNumber", payload: e.target.value }));

  return (
    <Paper elevation={1} className="tournament-control">
      <TextField
        label="Номер этапа"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={stageNumber}
        onChange={setNewValue}
      />
    </Paper>
  );
}
