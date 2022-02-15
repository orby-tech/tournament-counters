import { createSlice } from "@reduxjs/toolkit";
import { UserRule } from "../../common/models/user.model";
export type AvailableTabs = 0 | 1 | 2 | 4;

export type TabSliceType = {
  userRule: UserRule;
  selectedTab: AvailableTabs;
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    userRule: "user" as UserRule,
    selectedTab: 4 as AvailableTabs,
  },
  reducers: {
    setUserStatus: (state: TabSliceType, action: any) => {
      state.userRule = action.payload.payload;
    },
    setSelectedTab: (state: TabSliceType, action: any) => {
      console.log(action)
      state.selectedTab = action.payload.payload;
    },
  },
});

export const { setUserStatus, setSelectedTab } = tabsSlice.actions;
export default tabsSlice.reducer;
