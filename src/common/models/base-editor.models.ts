export type BaseEditorPerson = {
  id: string;
  name: string;
};

export type BaseEditorCommand = {
  id: string;
  name: string;
  persons: BaseEditorPerson[];
};
export type BaseEditorCommands = {
  commands: BaseEditorCommand[];
};

export type BaseEditorStructure = {
  structure: BaseEditorCommands;
};
