import * as React from "react";

import { Grid, Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setTourNumber } from "../../store/slices/structure.slice";

export function TourSelector() {
  const commandsСount = useAppSelector(
    (state) => state.structure.commandsCount
  );

  const tourNumber = useAppSelector((state) => state.structure.tourNumber);
  const dispatch = useAppDispatch();

  const setNewValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    value: number
  ) => dispatch(setTourNumber({ type: "tourNumber", payload: value }));

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item>
        <Pagination
          count={commandsСount}
          page={tourNumber}
          onChange={setNewValue}
          size="large"
        />
      </Grid>
    </Grid>
  );
}
