import { Grid, Button } from "@mui/material";

import React from "react";
import { useAppDispatch } from "../../../hooks";
import { addJury } from "../../../store/slices/structure.slice";

export function AddItemButton() {
  const dispatch = useAppDispatch();

  const createJury = () => {
    dispatch(addJury());
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item>
        <Button variant="outlined" onClick={() => createJury()}>
          +
        </Button>
      </Grid>
    </Grid>
  );
}
