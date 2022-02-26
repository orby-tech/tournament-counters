import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { TournamentState } from "../../../../common/models/structure.models";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import {
  getCommandPointsRows,
  getCommandPointsColumns,
} from "./utils/commnad-points";
import { CommandPointsTabsSelector } from "./commands-points-tabs-selector";

function CommandPointsPure() {
  const tournamentState = useSelector<RootState, TournamentState>(
    (state) => state.tournamentStructure.tournamentState
  );
  const commandPointsSelectedTab = useSelector<RootState, number>(
    (state) => state.tabs.commandPointsSelectedTab
  );

  const states = tournamentState.sections
    .map((section) => section.states)
    .flat();

  const rows = getCommandPointsRows(states, commandPointsSelectedTab);
  const columns = getCommandPointsColumns();

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CommandPointsTabsSelector />
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Box>
    </>
  );
}

export const CommandPoints = React.memo(CommandPointsPure);
