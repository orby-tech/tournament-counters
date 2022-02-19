import { createSlice } from "@reduxjs/toolkit";
import { Device } from "../../../common/models/device";

export type DevicesType = {
  devices: Device[];
  loaded: boolean;
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [] as Device[],
    loaded: false,
  },
  reducers: {
    setDevices: (state: DevicesType, action: any) => {
      state.devices = action.payload.payload;
      state.loaded = true;
    },
  },
});

export const { setDevices } = devicesSlice.actions;
export const devicesSliceReducer = devicesSlice.reducer;
