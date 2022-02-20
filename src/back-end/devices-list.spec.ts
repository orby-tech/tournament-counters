import {
  getWindowsDevicesList,
  getWindowsDevicesPathList,
} from "./devices-list";

describe("get devices list", function () {
  let devicesList;

  it("devices result is list", function () {
    devicesList = getWindowsDevicesList();
    console.log(devicesList);
    expect(Array.isArray(devicesList)).toBe(true);
  });

  it("paths result is list", function () {
    devicesList = getWindowsDevicesPathList();
    console.log(devicesList);
    expect(Array.isArray(devicesList)).toBe(true);
  });
});
