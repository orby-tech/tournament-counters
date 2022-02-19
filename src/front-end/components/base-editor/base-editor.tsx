import { Box, List, ListItem, Tab, Tabs, TextField } from "@mui/material";
import * as React from "react";
import {
  changeCommandName,
  changePersonName,
} from "../../../front-end/store/slices/base-editor.slice";
import {
  BaseEditorCommand,
  BaseEditorPerson,
} from "../../../common/models/base-editor.models";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddItemButton } from "./item-add-button";
import { useSelector } from "react-redux";
import {
  AvailableTabs,
  setEditorSelectedTab,
} from "../../../front-end/store/slices/tabs.slice";
import { RootState } from "../../../front-end/store/store";

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

export function BaseEditor() {
  const commands =
    useAppSelector((state) => state.baseEditor.structure.commands) || [];
  const editorSelectedTab = useSelector<RootState, AvailableTabs>(
    (state) => state.tabs.editorSelectedTab
  );

  const dispatch = useAppDispatch();
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={editorSelectedTab}
          onChange={(e, newValue: 0 | 1) =>
            dispatch(setEditorSelectedTab({ type: "", payload: newValue }))
          }
          aria-label="basic tabs example"
        >
          <Tab label="" disabled />
          <Tab label="Команды" />
          <Tab label="Устройства" />
        </Tabs>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div hidden={editorSelectedTab !== 1}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            {commands.map((command) => {
              return <Command command={command} key={command.id} />;
            })}
          </Box>
          <AddItemButton type="command" />
        </div>
        <div hidden={editorSelectedTab !== 2}></div>
      </Box>
    </>
  );
}
