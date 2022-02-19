import { createSlice } from "@reduxjs/toolkit";
import { BaseEditorStructure } from "../../../common/models/base-editor.models";

import { v4 as uuidv4 } from "uuid";
const getState = () =>
  ({
    structure: {
      commands: [],
    },
    manualUpdated: false,
  } as BaseEditorStructure);

export const baseEditorSlice = createSlice({
  name: "baseEditor",
  initialState: getState(),
  reducers: {
    setBaseState: (state, action) => {
      state.structure = action.payload.payload.structure;
      state.manualUpdated = false;
    },

    addCommand: (state, action) => {
      state.structure.commands = [
        ...state.structure.commands,
        { id: uuidv4(), name: "Новая команда", persons: [] },
      ];

      state.manualUpdated = true;
    },
    addPerson: (state, action) => {
      state.structure.commands.find(
        (command) => command.id === action.payload.payload
      ).persons = [
        ...state.structure.commands.find(
          (command) => command.id === action.payload.payload
        ).persons,
        { id: uuidv4(), name: "Новый участник" },
      ];

      state.manualUpdated = true;
    },

    changeCommandName: (state, action) => {
      state.structure.commands = state.structure.commands.map((command) => {
        if (command.id === action.payload.payload.id) {
          return action.payload.payload;
        }
        return command;
      });

      state.manualUpdated = true;
    },

    changePersonName: (state, action) => {
      state.structure.commands = state.structure.commands.map((command) => {
        if (command.id === action.payload.payload.command.id) {
          return {
            ...command,
            persons: command.persons.map((person) => {
              if (person.id === action.payload.payload.person.id) {
                return action.payload.payload.person;
              }
              return person;
            }),
          };
        }
        return command;
      });

      state.manualUpdated = true;
    },
  },
});

export const {
  addCommand,
  addPerson,
  changeCommandName,
  changePersonName,
  setBaseState,
} = baseEditorSlice.actions;
export default baseEditorSlice.reducer;
