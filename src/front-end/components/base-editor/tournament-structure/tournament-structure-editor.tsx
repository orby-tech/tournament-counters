import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useAppDispatch } from "../../../hooks";
import { useSelector } from "react-redux";
import { setTournamentEditorSelectedTab } from "../../../../front-end/store/slices/tabs.slice";
import { RootState } from "../../../../front-end/store/store";
import { PersonalPoints } from "./personal-points";
import { CommandPoints } from "./command-points";
import { CounterBody } from "../../counter-body/counter-body";

function TournamentStructureEditorPure() {
  const tournamentEditorSelectedTab = useSelector<RootState, 2 | 3>(
    (state) => state.tabs.tournamentEditorSelectedTab
  );

  const dispatch = useAppDispatch();

  return (
    <>
      {" "}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tournamentEditorSelectedTab}
          onChange={(e, newValue: 0 | 1) =>
            dispatch(
              setTournamentEditorSelectedTab({ type: "", payload: newValue })
            )
          }
          aria-label="basic tabs example"
        >
          <Tab label="" disabled />
          <Tab label="" disabled />
          <Tab label="Командные баллы" />
          <Tab label="Личные баллы" />
        </Tabs>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div hidden={tournamentEditorSelectedTab !== 2}>
          <CommandPoints />
        </div>
        <div hidden={tournamentEditorSelectedTab !== 3}>
          <PersonalPoints />
        </div>
      </Box>
    </>
  );
}

export const TournamentStructureEditor = React.memo(
  TournamentStructureEditorPure
);
