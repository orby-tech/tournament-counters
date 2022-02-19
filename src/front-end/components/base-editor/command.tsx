import { Box, List, TextField } from "@mui/material";
import * as React from "react";
import { changeCommandName } from "../../../front-end/store/slices/base-editor.slice";
import { BaseEditorCommand } from "../../../common/models/base-editor.models";
import { useAppDispatch } from "../../hooks";
import { AddItemButton } from "./item-add-button";
import { Person } from "./person";

export function Command({ command }: { command: BaseEditorCommand }) {
  const dispatch = useAppDispatch();

  const changeName = (e: any) => {
    dispatch(
      changeCommandName({
        action: "",
        payload: { ...command, name: e.target.value },
      })
    );
  };

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Команда:"
        variant="outlined"
        defaultValue={command.name}
        onChange={changeName}
      />
      <List>
        {command.persons.map((person) => {
          return <Person key={person.id} person={person} command={command} />;
        })}
      </List>
      <AddItemButton type="person" commandId={command.id} />
    </Box>
  );
}
