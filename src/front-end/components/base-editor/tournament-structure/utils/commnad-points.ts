import { StructureState } from "../../../../../common/models/structure.models";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

export const getCommandPointsRows = (
  states: StructureState[],
  commandPointsSelectedTab: number
): {
  id: string;
  command: string;
  oppositionScore: number;
  reviewerScore: number;
  reporterScore: number;
}[] => {
  const mapR = {} as {
    [key: string]: {
      id: string;
      command: string;
      oppositionScore: number;
      reviewerScore: number;
      reporterScore: number;
    };
  };

  const filteredStates =
    commandPointsSelectedTab === 0
      ? states
      : states.filter(
          (state) => state.stageNumber === commandPointsSelectedTab
        );

  for (const state of filteredStates) {
    mapR[state.opposition.command] = {
      id: mapR[state.opposition.command]?.id || uuidv4(),
      command: state.opposition.command,

      oppositionScore:
        mapR[state.opposition.command]?.oppositionScore ||
        0 +
          Object.values(state.tours).reduce(
            (acc, tour) => acc + tour.evaluations.technicalScores.opposition,
            0
          ),
      reviewerScore: mapR[state.opposition.command]?.reviewerScore || 0,
      reporterScore: mapR[state.opposition.command]?.reporterScore || 0,
    };
    mapR[state.reviewer.command] = {
      id: mapR[state.reviewer.command]?.id || uuidv4(),
      command: state.reviewer.command,
      oppositionScore: mapR[state.reviewer.command]?.oppositionScore || 0,
      reviewerScore:
        mapR[state.reviewer.command]?.reviewerScore ||
        0 +
          Object.values(state.tours).reduce(
            (acc, tour) => acc + tour.evaluations.technicalScores.revier,
            0
          ),
      reporterScore: mapR[state.reviewer.command]?.reporterScore || 0,
    };
    mapR[state.reporter.command] = {
      id: mapR[state.reporter.command]?.id || uuidv4(),
      command: state.reporter.command,
      oppositionScore: mapR[state.reporter.command]?.oppositionScore || 0,
      reviewerScore: mapR[state.reporter.command]?.reviewerScore || 0,
      reporterScore:
        mapR[state.reporter.command]?.reporterScore ||
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
  return rows;
};

export const getCommandPointsColumns = () => {
  const columns: GridColDef[] = [
    {
      field: "command",
      headerName: "command",
      width: 150,
      editable: true,
      sortingOrder: ["desc", null],
    },
    {
      field: "ТБ",
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

  return columns;
};
