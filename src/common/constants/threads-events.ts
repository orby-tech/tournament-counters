type ValueOf<T> = T[keyof T];

export type BuildAppEventsType = ValueOf<typeof buildAppEvents>;

export const buildAppEvents = {
  startBuild: "startBuild",
  deleteOldBuild: "deleteOldBuild",
  cloneApp: "cloneApp",
  installNPM: "installNPM",
  buildWindowsPacakge: "buildWindowsPacakge",
  endBuild: "endBuild",
} as const;

export const ERROR_WHEN_APP_BUILDING = "errorWhenAppBuilding";

export type CopyAppEventsType = ValueOf<typeof COPY_APP_EVENTS>;

export const COPY_APP_EVENTS = {
  startCoping: "startCoping",
  endCoping: "endCoping",
} as const;

export const ERROR_WHEN_APP_COPING = "errorWhenAppCoping";
