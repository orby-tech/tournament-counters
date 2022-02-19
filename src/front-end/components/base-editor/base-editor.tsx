import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import {
  AvailableTabs,
  setEditorSelectedTab,
} from "../../../front-end/store/slices/tabs.slice";
import { RootState } from "../../../front-end/store/store";
import { Devices } from "./devices";
import { CommandsEditor } from "../commands-editor";

function BaseEditorPure() {
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
          <CommandsEditor />
        </div>
        <div hidden={editorSelectedTab !== 2}>
          <Devices />
        </div>
      </Box>
    </>
  );
}

export const BaseEditor = React.memo(BaseEditorPure);
