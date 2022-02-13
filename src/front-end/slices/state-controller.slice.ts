import { createSlice } from "@reduxjs/toolkit";

export const stateControllerSlice = createSlice({
  name: "stateController",
  initialState: {
    mustLoad: true as boolean,
  },
  reducers: {
    loaded: (state, action) => {
      state.mustLoad = false;
    },
    mustLoad: (state, action) => {
      state.mustLoad = true;
    },
  },
});

export const { loaded, mustLoad } = stateControllerSlice.actions;
export default stateControllerSlice.reducer;
