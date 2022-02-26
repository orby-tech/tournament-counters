import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { TournamentState } from "../../../../common/models/structure.models";
import { Tabs, Tab } from "@mui/material";
import { setCommandPointsEditorSelectedTab } from "../../../../front-end/store/slices/tabs.slice";
import { useAppDispatch } from "../../../../front-end/hooks";

function CommandPointsTabsSelectorPure() {
  const commandPointsSelectedTab = useSelector<RootState, number>(
    (state) => state.tabs.commandPointsSelectedTab
  );
  const tournamentState = useSelector<RootState, TournamentState>(
    (state) => state.tournamentStructure.tournamentState
  );
  const dispatch = useAppDispatch();

  const states = tournamentState.sections
    .map((section) => section.states)
    .flat();

  const totalStages = {} as { [key: number]: true };
  for (const state of states) {
    totalStages[state.stageNumber] = true;
  }

  return (
    <Tabs
      value={commandPointsSelectedTab}
      onChange={(e, newValue: 0 | 1) =>
        dispatch(
          setCommandPointsEditorSelectedTab({ type: "", payload: newValue })
        )
      }
      aria-label="basic tabs example"
    >
      <Tab label="" disabled />
      <Tab label="" disabled />
      <Tab label="" disabled />
      {Object.keys(totalStages)
        .sort()
        .map((key) => {
          return <Tab label={`Этап ${key}`} value={+key} />;
        })}
      <Tab label="Итог" value={0} />
    </Tabs>
  );
}

export const CommandPointsTabsSelector = React.memo(
  CommandPointsTabsSelectorPure
);
