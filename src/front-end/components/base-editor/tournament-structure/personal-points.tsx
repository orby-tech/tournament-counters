import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../front-end/store/store";
import { TournamentState } from "../../../../common/models/structure.models";
import { DataGrid } from "@mui/x-data-grid";
import {
  getPersonalPointsColumns,
  getPersonalPointsRows,
} from "./utils/personal-points";

function PersonalPointsPure() {
  const tournamentState = useSelector<RootState, TournamentState>(
    (state) => state.tournamentStructure.tournamentState
  );

  const states = tournamentState.sections
    .map((section) => section.states)
    .flat();

  const rows = getPersonalPointsRows(states);
  const columns = getPersonalPointsColumns();

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

export const PersonalPoints = React.memo(PersonalPointsPure);
