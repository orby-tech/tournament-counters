import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useAppDispatch } from "../../../hooks";
import { useSelector } from "react-redux";
import { setTournamentEditorSelectedTab } from "../../../../front-end/store/slices/tabs.slice";
import { RootState } from "../../../../front-end/store/store";
import { TournamentState } from "../../../../common/models/structure.models";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

function PersonalPointsPure() {
  const tournamentState = useSelector<RootState, TournamentState>(
    (state) => state.tournamentStructure.tournamentState
  );

  const states = tournamentState.sections
    .map((section) => section.states)
    .flat();

  const mapR = {} as {
    [key: string]: {
      id: string;
      command: string;
      person: string;
      oppositionScore: number;
      reviewerScore: number;
      reporterScore: number;
    };
  };

  for (const state of states) {
    mapR[state.opposition.person] = {
      id: mapR[state.opposition.person]?.id || uuidv4(),
      command: state.opposition.command,
      person: state.opposition.person,
      oppositionScore:
        mapR[state.opposition.person]?.oppositionScore ||
        0 +
          Object.values(state.tours).reduce(
            (acc, tour) => acc + tour.evaluations.technicalScores.opposition,
            0
          ),
      reviewerScore: mapR[state.opposition.person]?.reviewerScore || 0,
      reporterScore: mapR[state.opposition.person]?.reporterScore || 0,
    };
    mapR[state.reviewer.person] = {
      id: mapR[state.reviewer.person]?.id || uuidv4(),
      command: state.reviewer.command,
      person: state.reviewer.person,
      oppositionScore: mapR[state.reviewer.person]?.oppositionScore || 0,
      reviewerScore:
        mapR[state.reviewer.person]?.reviewerScore ||
        0 +
          Object.values(state.tours).reduce(
            (acc, tour) => acc + tour.evaluations.technicalScores.revier,
            0
          ),
      reporterScore: mapR[state.reviewer.person]?.reporterScore || 0,
    };
    mapR[state.reporter.person] = {
      id: mapR[state.reporter.person]?.id || uuidv4(),
      command: state.reporter.command,
      person: state.reporter.person,
      oppositionScore: mapR[state.reporter.person]?.oppositionScore || 0,
      reviewerScore: mapR[state.reporter.person]?.reviewerScore || 0,
      reporterScore:
        mapR[state.reporter.person]?.reporterScore ||
        0 +
          Object.values(state.tours).reduce(
            (acc, tour) =>
              acc +
              tour.evaluations.technicalScores.scince +
              tour.evaluations.technicalScores.presentation,
            0
          ),
    };
  }

  const rows = Object.values(mapR);

  const columns: GridColDef[] = [
    {
      field: "command",
      headerName: "command",
      width: 150,
      editable: true,
      sortingOrder: ["desc", null],
    },
    {
      field: "person",
      headerName: "person",
      width: 150,
      editable: true,
    },
    {
      field: "reporterScore",
      headerName: "reporterScore",
      width: 150,
      editable: true,
      sortingOrder: ["desc", null],
    },
    {
      field: "oppositionScore",
      headerName: "oppositionScore",
      width: 150,
      editable: true,
      sortingOrder: ["desc", null],
    },
    {
      field: "reviewerScore",
      headerName: "reviewerScore",
      width: 150,
      editable: true,
      sortingOrder: ["desc", null],
    },
    {
      field: "totalScore",
      headerName: "totalScore",
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.reporterScore ||
        0 + params.row.oppositionScore ||
        0 + params.row.reviewerScore ||
        0,
      sortingOrder: ["desc", null],
    },
  ];
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
          <></>
        </div>
        <div hidden={tournamentEditorSelectedTab !== 3}>
          <PersonalPointsPure />
        </div>
      </Box>
    </>
  );
}

export const TournamentStructureEditor = React.memo(
  TournamentStructureEditorPure
);
