import * as React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { Box, Tab, Tabs } from "@mui/material";
import { AvailableTabs, setSelectedTab as setSelectedTabSlice } from "../store/slices/tabs.slice";

export function TabSelector() {
  const selectedTab = useSelector<RootState, AvailableTabs>(
    (state) => state.tabs.selectedTab
  );

  const dispatch = useAppDispatch();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue: AvailableTabs) =>
          dispatch(
            setSelectedTabSlice({ type: "juryNumber", payload: newValue })
          )
        }
        aria-label="basic tabs example"
      >
        <Tab label="Основная информация" />
        <Tab label="Команды" />
        <Tab label="Информация о туре" />
        <Tab label="" disabled />
        <Tab label="Редактор" />
      </Tabs>
    </Box>
  );
}
