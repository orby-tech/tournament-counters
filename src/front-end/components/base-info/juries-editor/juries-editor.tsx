import { Paper, List } from "@mui/material";

import React from "react";
import { useAppSelector } from "../../../hooks";
import { AddItemButton } from "./item-add-button";
import { JuriesEditorItem } from "./juries-editor-item";

export function JuriesEditor() {
  const juries = useAppSelector((state) => state.structure.juries);

  const activeJuries = juries.filter((jury) => jury.active);
  const noActiveJuries = juries.filter((jury) => !jury.active);

  return (
    <Paper elevation={1} className="tournament-control">
      <List>
        {activeJuries.map((jury) => (
          <JuriesEditorItem jury={jury} activeRow={true} />
        ))}
        <AddItemButton />
        {noActiveJuries.map((jury) => (
          <JuriesEditorItem jury={jury} activeRow={false} />
        ))}
      </List>
    </Paper>
  );
}
