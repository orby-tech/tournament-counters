import child_process from "child_process";

export const getWindowsDevicesList = (): string[] => {
  const lines = child_process
    .execSync("wmic logicaldisk where drivetype=2 get DeviceID")
    .toString()
    .trim()
    .split("\n")
    .map((line) => line.trim());
  if (lines[0] === "DeviceID") {
    return lines.slice(1);
  }

  console.error("Some error when rid devices");

  return [];
};

export const getWindowsDevicesPathList = (): string[] => {
  return getWindowsDevicesList().map((device) => device + "/");
};
