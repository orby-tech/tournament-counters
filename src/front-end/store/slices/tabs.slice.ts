import { createSlice } from "@reduxjs/toolkit";
import { UserRule } from "../../../common/models/user.model";
export type AvailableTabs = 0 | 1 | 2 | 4;

export type TabSliceType = {
  userRule: UserRule;
  selectedTab: AvailableTabs;
  editorSelectedTab: 0 | 1;
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    userRule: "root" as UserRule,
    selectedTab: 4 as AvailableTabs,
    editorSelectedTab: 1 as 1 | 2,
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
  },
});

export const { setUserStatus, setSelectedTab, setEditorSelectedTab } =
  tabsSlice.actions;
export default tabsSlice.reducer;
