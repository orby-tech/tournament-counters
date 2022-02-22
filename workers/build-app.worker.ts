import { AppBuilder } from "../src/back-end/build-app";
import { parentPort } from "worker_threads";
import { buildAppEvents } from "../src/common/constants/threads-events";

export const buildAppWorker = async () => {
  const appBuilder = new AppBuilder();
  parentPort.postMessage(buildAppEvents.startBuild);

  parentPort.postMessage(buildAppEvents.deleteOldBuild);
  appBuilder.deleteBuildDir();

  parentPort.postMessage(buildAppEvents.cloneApp);
  await appBuilder.cloneApp();

  parentPort.postMessage(buildAppEvents.installNPM);
  appBuilder.installNpm();

  parentPort.postMessage(buildAppEvents.buildWindowsPacakge);
  appBuilder.buildWindowsPackage();

  parentPort.postMessage(buildAppEvents.endBuild);
};
