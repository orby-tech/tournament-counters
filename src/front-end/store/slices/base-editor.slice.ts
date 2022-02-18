import { createSlice } from "@reduxjs/toolkit";
import {
  BaseEditorCommand,
  BaseEditorPerson,
  BaseEditorStructure,
} from "../../../common/models/base-editor.models";

import { v4 as uuidv4 } from "uuid";
const getState = () =>
  ({
    structure: {
      commands: [
        {
          id: "12",
          name: "12",
          persons: [
            {
              id: "12_1",
              name: "12_1",
            } as BaseEditorPerson,
            {
              id: "12_2",
              name: "12_2",
            } as BaseEditorPerson,
            {
              id: "12_3",
              name: "12_3",
            } as BaseEditorPerson,
            {
              id: "12_4",
              name: "12_4",
            } as BaseEditorPerson,
          ],
        } as BaseEditorCommand,
        {
          id: "13",
          name: "13",
          persons: [
            {
              id: "13_1",
              name: "13_1",
            } as BaseEditorPerson,
            {
              id: "13_2",
              name: "13_2",
            } as BaseEditorPerson,
            {
              id: "13_3",
              name: "13_3",
            } as BaseEditorPerson,
            {
              id: "13_4",
              name: "13_4",
            } as BaseEditorPerson,
          ],
        } as BaseEditorCommand,
        {
          id: "14",
          name: "14",
          persons: [
            {
              id: "14_1",
              name: "14_1",
            } as BaseEditorPerson,
            {
              id: "14_2",
              name: "14_2",
            } as BaseEditorPerson,
            {
              id: "14_3",
              name: "14_3",
            } as BaseEditorPerson,
            {
              id: "14_4",
              name: "14_4",
            } as BaseEditorPerson,
          ],
        } as BaseEditorCommand,
      ],
    },
  } as BaseEditorStructure);

export const baseEditorSlice = createSlice({
  name: "baseEditor",
  initialState: getState(),
  reducers: {
    addCommand: (state, action) => {
      state.structure.commands = [
        ...state.structure.commands,
        { id: uuidv4(), name: "Новая команда", persons: [] },
      ];
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
    },

    changeCommandName: (state, action) => {
      state.structure.commands = state.structure.commands.map((command) => {
        if (command.id === action.payload.payload.id) {
          return action.payload.payload;
        }
        return command;
      });
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
    },
  },
});

export const { addCommand, addPerson, changeCommandName, changePersonName } =
  baseEditorSlice.actions;
export default baseEditorSlice.reducer;
