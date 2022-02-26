import { StructureState } from "../../../../../common/models/structure.models";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

export const getPersonalPointsRows = (
  states: StructureState[]
): {
  id: string;
  command: string;
  person: string;
  oppositionScore: number;
  reviewerScore: number;
  reporterScore: number;
}[] => {
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
  return rows;
};

export const getPersonalPointsColumns = () => {
  const columns: GridColDef[] = [
    {
      field: "command",
      headerName: "command",
      width: 150,
      editable: true,
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

  return columns;
};
