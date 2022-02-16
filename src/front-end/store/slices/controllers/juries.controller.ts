import { JuryModel } from "../../../../common/models/jury";

import { v4 as uuidv4 } from "uuid";
export class JutiesController {
  toggleJury(juries: JuryModel[], id: string): JuryModel[] {
    return juries.map((jury) => {
      if (jury.id === id) {
        jury.active = !jury.active;
      }
      return jury;
    });
  }

  createJury(juries: JuryModel[]): JuryModel[] {
    return [
      ...juries,
      {
        title: `Новый жюри ${juries.length}`,
        id: uuidv4(),
        active: true,
      } as JuryModel,
    ];
  }
}
