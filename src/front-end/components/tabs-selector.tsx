import * as React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { Box, Tab, Tabs } from "@mui/material";
import {
  AvailableTabs,
  setSelectedTab as setSelectedTabSlice,
} from "../store/slices/tabs.slice";

import { useTranslation } from "react-i18next";
import { locMap } from "../locale/i18n";

export function TabSelector() {
  const selectedTab = useSelector<RootState, AvailableTabs>(
    (state) => state.tabs.selectedTab
  );

  const { t } = useTranslation();

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
        <Tab label={t(locMap.headers.base_info)} />
        <Tab label={t(locMap.headers.commands)} />
        <Tab label={t(locMap.headers.tour_info)} />
        <Tab label="" disabled />
        <Tab label={t(locMap.headers.editor)} />
      </Tabs>
    </Box>
  );
}
