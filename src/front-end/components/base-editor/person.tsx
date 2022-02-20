import { ListItem, TextField } from "@mui/material";
import * as React from "react";
import { changePersonName } from "../../../front-end/store/slices/base-editor.slice";
import {
  BaseEditorCommand,
  BaseEditorPerson,
} from "../../../common/models/base-editor.models";
import { useAppDispatch } from "../../hooks";

export function Person({
  person,
  command,
}: {
  person: BaseEditorPerson;
  command: BaseEditorCommand;
}) {
  const dispatch = useAppDispatch();

  const changeName = (e: any) => {
    dispatch(
      changePersonName({
        action: "",
        payload: {
          person: { ...person, name: e.target.value },
          command: command,
        },
      })
    );
  };
  return (
    <ListItem>
      <TextField
        id="outlined-basic"
        label={person.name}
        variant="outlined"
        defaultValue={person.name}
        onChange={changeName}
      />
    </ListItem>
  );
}
