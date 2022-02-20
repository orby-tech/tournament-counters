import { createSlice } from "@reduxjs/toolkit";
import { BuildAppEventsType } from "../../../common/constants/threads-events";
import { Device } from "../../../common/models/device";

export type DevicesType = {
  devices: Device[];
  loaded: boolean;
  buildState: BuildAppEventsType;
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [] as Device[],
    loaded: false,
    buildState: "endBuild" as BuildAppEventsType,
  },
  reducers: {
    setDevices: (state: DevicesType, action: any) => {
      state.devices = action.payload.payload;
      state.loaded = true;
    },
    setBuildState: (state: DevicesType, action: any) => {
      console.log(24);
      state.buildState = action.payload.payload;
    },
  },
});

export const { setDevices, setBuildState } = devicesSlice.actions;
export const devicesSliceReducer = devicesSlice.reducer;
