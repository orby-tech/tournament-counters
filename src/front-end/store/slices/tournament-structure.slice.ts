import { createSlice } from "@reduxjs/toolkit";
import { TournamentState } from "../../../common/models/structure.models";

export const tournamentStructureSlice = createSlice({
  name: "tournamentStructure",
  initialState: {
    tournamentState: { sections: [] } as TournamentState,
    loaded: false,
  },
  reducers: {
    setTournamentState: (state, action) => {
      state.tournamentState = action.payload.payload;
      state.loaded = true;
    },
  },
});

export const { setTournamentState } = tournamentStructureSlice.actions;
export const tournamentStructureReducer = tournamentStructureSlice.reducer;
