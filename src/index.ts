import { copyAppWorker } from "../workers/copy-app.worker";
import { isMainThread, workerData } from "worker_threads";
import { buildAppWorker } from "../workers/build-app.worker";
import { initMainThread } from "./main-thread.worker";

if (isMainThread) {
  initMainThread();
} else {
  if (workerData.workerType === "buildApp") {
    buildAppWorker();
  }
  if (workerData.workerType === "copyApp") {
    copyAppWorker(workerData.path);
  }
}
