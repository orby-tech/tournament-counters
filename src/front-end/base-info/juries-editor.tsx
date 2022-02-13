import { Paper, Grid, Button, IconButton, List, ListItem, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addJury, toggleJury as toggleJuryState } from "../slices/structure.slice";


export function JuriesEditor() {
  const juries = useAppSelector((state) => state.structure.juries);
  const dispatch = useAppDispatch();

  const activeJuries = juries.filter((jury) => jury.active);
  const noActiveJuries = juries.filter((jury) => !jury.active);

  const toggleJury = (id: string) => {
    dispatch(toggleJuryState({ type: "juries", payload: id }));
  };

  const createJury = () => {
    dispatch(addJury());
  };

  return (
    <Paper elevation={1} className="tournament-control">
      <List>
        {activeJuries.map((jury, index) => (
          <ListItem
            key={jury.id}
            button
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => toggleJury(jury.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            {jury.title}
          </ListItem>
        ))}
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button variant="outlined" onClick={() => createJury()}>
              +
            </Button>
          </Grid>
        </Grid>
        {noActiveJuries.map((jury, index) => (
          <ListItem
            key={jury.id}
            button
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="activate"
                onClick={() => toggleJury(jury.id)}
              >
                <Icon>+</Icon>
              </IconButton>
            }
          >
            {jury.title}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
