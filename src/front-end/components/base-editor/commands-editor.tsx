import { Box } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../hooks";
import { AddItemButton } from "./item-add-button";
import { Command } from "./command";

function CommandsEditorPure() {
  const commands =
    useAppSelector((state) => state.baseEditor.structure.commands) || [];

  return (
    <>
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
    </>
  );
}

export const CommandsEditor = React.memo(CommandsEditorPure);
