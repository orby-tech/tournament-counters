import { createSlice } from "@reduxjs/toolkit";
import { UserRule } from "../../../common/models/user.model";
export type AvailableTabs = 0 | 1 | 2 | 4;

export type TabSliceType = {
  userRule: UserRule;
  selectedTab: AvailableTabs;
  editorSelectedTab: 1 | 2;
  tournamentEditorSelectedTab: 2 | 3;
  commandPointsSelectedTab: number;
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    userRule: "root" as UserRule,
    selectedTab: 4 as AvailableTabs,
    editorSelectedTab: 3 as 1 | 2 | 3,
    tournamentEditorSelectedTab: 2 as 2 | 3,
    commandPointsSelectedTab: 0,
  },
  reducers: {
    setUserStatus: (state: TabSliceType, action: any) => {
      state.userRule = action.payload.payload;
    },
    setSelectedTab: (state: TabSliceType, action: any) => {
      state.selectedTab = action.payload.payload;
    },
    setEditorSelectedTab: (state: TabSliceType, action: any) => {
      state.editorSelectedTab = action.payload.payload;
    },
    setTournamentEditorSelectedTab: (state: TabSliceType, action: any) => {
      state.tournamentEditorSelectedTab = action.payload.payload;
    },
    setCommandPointsEditorSelectedTab: (state: TabSliceType, action: any) => {
      state.commandPointsSelectedTab = action.payload.payload;
    },
  },
});

export const {
  setUserStatus,
  setSelectedTab,
  setEditorSelectedTab,
  setTournamentEditorSelectedTab,
  setCommandPointsEditorSelectedTab,
} = tabsSlice.actions;
export default tabsSlice.reducer;
