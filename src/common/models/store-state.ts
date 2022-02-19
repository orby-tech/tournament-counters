import { BaseEditorStructure } from "./base-editor.models";
import { StructureState } from "./structure.models";

export type StoreState = {
  structure: StructureState;
  baseEditor: BaseEditorStructure;
};
