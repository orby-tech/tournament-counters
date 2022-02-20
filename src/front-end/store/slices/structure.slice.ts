import { createSlice } from "@reduxjs/toolkit";
import {
  AvailableEvaluations,
  StructureState,
} from "../../../common/models/structure.models";
import { EvaluationType } from "../../../common/models/evaluation-type.model";
import { JuryModel } from "../../../common/models/jury";
import { JutiesController } from "./controllers/juries.controller";
import { getInitialState } from "../../../common/get-state";

const jutiesController = new JutiesController();

export const structureSlice = createSlice({
  name: "structure",
  initialState: getInitialState(),
  reducers: {
    setStructureState: (state, action) => {
      state.structure = { ...action.payload.payload.structure };
      state.juries = action.payload.payload.juries;
      state.reporter = { ...action.payload.payload.reporter };
      state.opposition = { ...action.payload.payload.opposition };
      state.reviewer = { ...action.payload.payload.reviewer };
      state.commandsCount = action.payload.payload.commandsCount;
      state.commandsColumns = [...action.payload.payload.commandsColumns];
      state.tours = { ...action.payload.payload.tours };
      state.tourNumber = action.payload.payload.tourNumber;
      state.stageNumber = action.payload.payload.stageNumber;
      state.sectionNumber = action.payload.payload.sectionNumber;

      state.manualUpdated = false;
    },

    addJury: (state) => {
      state.juries = jutiesController.createJury(state.juries);

      state.manualUpdated = true;
    },
    toggleJury: (state, action) => {
      state.juries = jutiesController.toggleJury(
        state.juries,
        action.payload.payload
      );
      state.manualUpdated = true;
    },
    setJuriesCount: (state, action) => {
      return;
    },
    setJuryTitle: (state, action) => {
      state.juries = state.juries.map((jury) => {
        if (action.payload.payload.id === jury.id) {
          return {
            ...jury,
            title: action.payload.payload.title,
          };
        }
        return jury;
      });

      state.manualUpdated = true;
    },

    selectReporterCommand: (state, action) => {
      state.reporter = { ...state.reporter, command: action.payload.payload };

      state.manualUpdated = true;
    },
    selectReporterPerson: (state, action) => {
      state.reporter = { ...state.reporter, person: action.payload.payload };

      state.manualUpdated = true;
    },
    setReporterCoefficient: (state, action) => {
      state.reporter = {
        ...state.reporter,
        coefficient: action.payload.payload,
      };

      state.manualUpdated = true;
    },

    selectOppositionCommand: (state, action) => {
      state.opposition = {
        ...state.opposition,
        command: action.payload.payload,
      };

      state.manualUpdated = true;
    },
    selectOppositionPerson: (state, action) => {
      state.opposition = {
        ...state.opposition,
        person: action.payload.payload,
      };

      state.manualUpdated = true;
    },
    setOppositionCoefficient: (state, action) => {
      state.opposition = {
        ...state.opposition,
        coefficient: action.payload.payload,
      };

      state.manualUpdated = true;
    },

    selectReviewerCommand: (state, action) => {
      state.reviewer = {
        ...state.reviewer,
        command: action.payload.payload,
      };

      state.manualUpdated = true;
    },
    selectReviewerPerson: (state, action) => {
      state.reviewer = {
        ...state.reviewer,
        person: action.payload.payload,
      };

      state.manualUpdated = true;
    },
    setReviewerCoefficient: (state, action) => {
      state.reviewer = {
        ...state.reviewer,
        coefficient: action.payload.payload,
      };

      state.manualUpdated = true;
    },

    setCommandsCount: (state, action) => {
      state.commandsCount = action.payload.payload;

      state.manualUpdated = true;
    },
    setCommandsColumns: (state, action) => {
      state.commandsColumns = [...action.payload.payload];

      state.manualUpdated = true;
    },

    setEvaluation: (
      state,
      action: {
        payload: {
          type: string;
          payload: {
            jury: JuryModel;
            value: AvailableEvaluations;
            evaluationType: EvaluationType;
          };
        };
      }
    ) => {
      const value = action.payload.payload;
      const evaluations = state.tours[state.tourNumber].evaluations;
      evaluations[value.evaluationType][value.jury.id] = value.value;

      state.manualUpdated = true;
    },

    setTourNumber: (state, action) => {
      state.tourNumber = action.payload.payload;

      state.manualUpdated = true;
    },
    setStageNumber: (state, action) => {
      state.stageNumber = action.payload.payload;

      state.manualUpdated = true;
    },
    setSectionNumber: (state, action) => {
      state.sectionNumber = action.payload.payload;

      state.manualUpdated = true;
    },
  },
});

export const usersOprtions = (
  structure: StructureState,
  commandName: string
): {
  value: string;
  label: string;
}[] => {
  return [
    {
      value: "",
      label: "Не выбрано",
    },
    ...(structure.structure[commandName]?.map((key) => {
      return {
        value: key,
        label: key,
      };
    }) || []),
  ];
};

export const {
  setStructureState,
  addJury,
  toggleJury,
  setJuriesCount,
  setJuryTitle,

  selectReporterCommand,
  selectReporterPerson,
  setReporterCoefficient,

  selectOppositionCommand,
  selectOppositionPerson,
  setOppositionCoefficient,

  selectReviewerCommand,
  selectReviewerPerson,
  setReviewerCoefficient,

  setCommandsCount,
  setCommandsColumns,

  setEvaluation,
  setTourNumber,
  setStageNumber,
  setSectionNumber,
} = structureSlice.actions;
export default structureSlice.reducer;
