import { JuryModel } from "./models/jury";
import {
  Tour,
  StructureType,
  StructureState,
} from "./models/structure.models";

const getTour = (): Tour => {
  return {
    evaluations: {
      scince: {},
      presentation: {},
      revier: {},
      opposition: {},
      technicalScores: {
        scince: 0,
        presentation: 0,
        revier: 0,
        opposition: 0,
      },
    },
  };
};

const structure = {
  command1: ["command1-person1", "command1-person2"],
  command2: ["command2-person1", "command2-person2"],
  command3: ["command3-person1", "command3-person2"],
  command4: ["command4-person1", "command4-person2"],
  command5: ["command5-person1", "command5-person2"],
} as StructureType;

const initialJuries = (): JuryModel[] => {
  const juries = [] as JuryModel[];
  for (let i = 0; i < 5; i++) {
    juries.push({ title: `Жюри del ${i}`, id: `jury_${i}`, active: true });
  }
  for (let i = 5; i < 10; i++) {
    juries.push({ title: `Жюри del ${i}`, id: `jury_${i}`, active: false });
  }
  return juries;
};

export const getInitialState = (): StructureState => {
  return {
    structure: structure,
    juries: initialJuries(),
    reporter: {
      command: "",
      person: "",
      coefficient: 1,
    },
    opposition: {
      command: "",
      person: "",
      coefficient: 1,
    },
    reviewer: {
      command: "",
      person: "",
      coefficient: 1,
    },
    commandsCount: 2,
    commandsColumns: ["command1", "command2"],
    tours: {
      1: getTour(),
      2: getTour(),
      3: getTour(),
      4: getTour(),
      5: getTour(),
    },
    tourNumber: 1,
    stageNumber: 1,
    sectionNumber: 1,
    manualUpdated: false,
  };
};
