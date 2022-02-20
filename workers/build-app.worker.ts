import {
  buildWindowsPackage,
  cloneApp,
  deleteBuildDir,
  installNpm,
} from "../src/back-end/build-app";
import { parentPort } from "worker_threads";
import { buildAppEvents } from "../src/common/constants/threads-events";

export const buildAppWorker = async () => {
  parentPort.postMessage(buildAppEvents.startBuild);

  parentPort.postMessage(buildAppEvents.deleteOldBuild);
  deleteBuildDir();

  parentPort.postMessage(buildAppEvents.cloneApp);
  await cloneApp();

  parentPort.postMessage(buildAppEvents.installNPM);
  installNpm();

  parentPort.postMessage(buildAppEvents.buildWindowsPacakge);
  buildWindowsPackage();

  parentPort.postMessage(buildAppEvents.endBuild);
};
