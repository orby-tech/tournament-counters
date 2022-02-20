export type EmptyDevice = {
  id: string;
  path: string;
};

export type Device = {
  id: string;
  path: string;
  usedEarly: boolean;
  actualDatabase: boolean;
  databaseFromOldTournament: boolean;
};
