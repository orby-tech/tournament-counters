import { IconButton, Icon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";
import { useAppDispatch } from "../../hooks";
import { toggleJury as toggleJuryState } from "../../slices/structure.slice";
import { JuryModel } from "../../../common/models/jury";

export function JuriesEditorItemSecondaryAction({
  jury,
  activeRow,
}: {
  jury: JuryModel;
  activeRow: boolean;
}) {
  const dispatch = useAppDispatch();

  const toggleJury = (id: string) => {
    dispatch(toggleJuryState({ type: "juries", payload: id }));
  };

  if (activeRow) {
    return (
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => toggleJury(jury.id)}
      >
        <DeleteIcon />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        edge="end"
        aria-label="activate"
        onClick={() => toggleJury(jury.id)}
      >
        <Icon>+</Icon>
      </IconButton>
    );
  }
}
