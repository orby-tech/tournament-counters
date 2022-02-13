import { JuryModel } from "./jury";

export type StructureType = { [key: string]: string[] };

export type StructurePerson = {
  command: string;
  person: string;
  coefficient: number;
};

export type StructureState = {
  structure: StructureType;
  juries: JuryModel[];
  reporter: StructurePerson;
  opposition: StructurePerson;
  reviewer: StructurePerson;
  commandsCount: number;
  commandsColumns: string[];
  tours: Tours;
  tourNumber: AvailableTours;
  stageNumber: number;
  sectionNumber: number;
  manualUpdated: boolean;
};

export type AvailableTours = 1 | 2 | 3 | 4 | 5;

export type AvailableEvaluations =
  | ""
  | "2"
  | "3-"
  | "3"
  | "3+"
  | "4-"
  | "4"
  | "4+"
  | "5-"
  | "5"
  | "5+";

export type Evaluations = {
  scince: { [key: string]: AvailableEvaluations };
  presentation: { [key: string]: AvailableEvaluations };
  revier: { [key: string]: AvailableEvaluations };
  opposition: { [key: string]: AvailableEvaluations };
  technicalScores: {
    scince: number;
    presentation: number;
    revier: number;
    opposition: number;
  };
};

export type Tour = {
  evaluations: Evaluations;
};

export type Tours = {
  [key in AvailableTours]: Tour;
};
