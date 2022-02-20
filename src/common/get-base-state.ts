import {
  BaseEditorCommand,
  BaseEditorPerson,
  BaseEditorStructure,
} from "./models/base-editor.models";

export const getBaseState = () =>
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
    manualUpdated: false,
  } as BaseEditorStructure);
