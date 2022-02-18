import { Grid, Button } from "@mui/material";

import React from "react";
import { useAppDispatch } from "../../hooks";
import { addCommand, addPerson } from "../../store/slices/base-editor.slice";

export function AddItemButton({
  type,
  commandId,
}: {
  type: "person" | "command";
  commandId?: string;
}) {
  const dispatch = useAppDispatch();

  const create = () => {
    if (type === "person") {
      dispatch(addPerson({ action: "", payload: commandId }));
    } else {
      dispatch(addCommand({ action: "", payload: "" }));
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item>
        <Button variant="outlined" onClick={() => create()}>
          +
        </Button>
      </Grid>
    </Grid>
  );
}
