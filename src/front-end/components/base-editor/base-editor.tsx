import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { setEditorSelectedTab } from "../../../front-end/store/slices/tabs.slice";
import { RootState } from "../../../front-end/store/store";
import { Devices } from "./devices/devices";
import { CommandsEditor } from "./commands-editor";
import { TournamentStructureEditor } from "./tournament-structure/tournament-structure-editor";

function BaseEditorPure() {
  const editorSelectedTab = useSelector<RootState, 1 | 2 | 3>(
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
          <Tab label="Турнир" />
        </Tabs>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div hidden={editorSelectedTab !== 1}>
          <CommandsEditor />
        </div>
        <div hidden={editorSelectedTab !== 2}>
          <Devices />
        </div>
        <div hidden={editorSelectedTab !== 3}>
          <TournamentStructureEditor />
        </div>
      </Box>
    </>
  );
}

export const BaseEditor = React.memo(BaseEditorPure);
