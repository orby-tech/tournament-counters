import { CopyAppBuilder } from "../src/back-end/build-app";
import { parentPort } from "worker_threads";
import { COPY_APP_EVENTS } from "../src/common/constants/threads-events";

export const copyAppWorker = async (path: string) => {
  const copyAppBuilder = new CopyAppBuilder();
  parentPort.postMessage(COPY_APP_EVENTS.startCoping);

  copyAppBuilder.copyWindowsPackageToPath(path);

  parentPort.postMessage(COPY_APP_EVENTS.endCoping);
};
