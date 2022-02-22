import simpleGit from "simple-git";
import {
  APP_NAME,
  BUILD_DIRECTORY,
  DIRECTORY_NAME_ON_FLASH,
  REPOSITORY_URL,
} from "../common/constants/app.constants";
import { execSync } from "child_process";
import fs from "fs";
import fsExtra from "fs-extra";
import { IpcMainEvent } from "electron";

import { Worker } from "worker_threads";
import {
  ERROR_WHEN_APP_BUILDING,
  ERROR_WHEN_APP_COPING,
} from "../common/constants/threads-events";

export const getBuildAppWorker = async (event: IpcMainEvent) => {
  const worker = new Worker(__filename, {
    workerData: { workerType: "buildApp" },
  });

  worker.on("message", (e) => {
    event.sender.send(e);
  });
  worker.on("error", (e) => {
    event.sender.send(ERROR_WHEN_APP_BUILDING, e);
  });
  worker.on("exit", (code) => {
    if (code !== 0) {
      event.sender.send(ERROR_WHEN_APP_BUILDING, code);
    }
  });
};

export const getCopyAppWorker = async (event: IpcMainEvent, path: string) => {
  const worker = new Worker(__filename, {
    workerData: { workerType: "copyApp", path: path },
  });

  worker.on("message", (e) => {
    event.sender.send(e);
  });
  worker.on("error", (e) => {
    event.sender.send(ERROR_WHEN_APP_COPING, e);
  });
  worker.on("exit", (code) => {
    if (code !== 0) {
      event.sender.send(ERROR_WHEN_APP_COPING, code);
    }
  });
};

export class AppBuilder {
  buildApp = async () => {
    this.deleteBuildDir();
    await this.cloneApp();
    this.installNpm();
    this.buildWindowsPackage();
    return true;
  };

  deleteBuildDir = () => {
    try {
      fs.rmdirSync(BUILD_DIRECTORY, { recursive: true });
    } catch (e) {}
  };

  cloneApp = async () => {
    await simpleGit().clone(REPOSITORY_URL, BUILD_DIRECTORY);
  };

  installNpm = () => {
    execSync(`cd ${BUILD_DIRECTORY} && npm i `);
  };

  buildWindowsPackage = () => {
    execSync(`cd ${BUILD_DIRECTORY} && npm run make `);
  };
}

export class CopyAppBuilder {
  copyWindowsPackageToPath = (targetPath: string) => {
    fsExtra.copySync(
      `${BUILD_DIRECTORY}/out/${APP_NAME}-win32-x64/`,
      `${targetPath}/${DIRECTORY_NAME_ON_FLASH}`
    );
    fsExtra.copySync(
      `${BUILD_DIRECTORY}/start-app.bat`,
      `${targetPath}/start-app.bat`
    );
  };
}
