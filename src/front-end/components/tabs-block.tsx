import * as React from "react";
import { BaseInfoBody } from "./base-info/base-info-body";
import { CommandsEditor } from "./commands-editor";
import { CounterBody } from "./counter-body/counter-body";
import { Box } from "@mui/material";
import { RootState } from "../store/store";
import { TabSliceType } from "../store/slices/tabs.slice";
import { useSelector } from "react-redux";
import { LoginForm } from "./login-form";
import { BaseEditor } from "./base-editor";

export function TabsBlock() {
  const tabs = useSelector<RootState, TabSliceType>((state) => state.tabs);
  const selectedTab = tabs.selectedTab;
  const userRule = tabs.userRule;

  if (selectedTab === 4 && userRule !== "root") {
    return <LoginForm />;
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <div hidden={selectedTab !== 0}>
        <BaseInfoBody />
      </div>
      <div hidden={selectedTab !== 1}>
        <CommandsEditor />
      </div>
      <div hidden={selectedTab !== 2}>
        <CounterBody />
      </div>
      <div hidden={selectedTab !== 4}>
        <BaseEditor />
      </div>
    </Box>
  );
}
