import { StructureState } from "../structure.slice";

export const commandsList = (structure: StructureState) => {
  return [
    {
      value: null,
      label: "Не выбрано",
      disabled: false,
    },
    ...Object.keys(structure.structure).map((key) => {
      return {
        value: key,
        label: key,
        disabled: false,
      };
    }),
  ];
};

export const commandsOptions = (structure: StructureState) => {
  return [
    {
      value: null,
      label: "Не выбрано",
      disabled: false,
    },
    ...Object.keys(structure.structure).map((key) => {
      const reporterCommand = structure.reporter.command;
      const oppositionCommand = structure.opposition.command;
      const reviewerCommand = structure.reviewer.command;

      let disabled = false;

      if (reporterCommand && reporterCommand === key) {
        disabled = true;
      }
      if (oppositionCommand && oppositionCommand === key) {
        disabled = true;
      }
      if (reviewerCommand && reviewerCommand === key) {
        disabled = true;
      }
      return {
        value: key,
        label: key,
        disabled: disabled,
      };
    }),
  ];
};
