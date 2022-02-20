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

export const buildAppIPC = async (event: IpcMainEvent) => {
  await buildApp();
  event.sender.send("build-app-finish");
};

export const buildApp = async () => {
  deleteBuildDir();
  await cloneApp();
  installNpm();
  buildWindowsPackage();
  return true;
};

export const deleteBuildDir = () => {
  try {
    fs.rmdirSync(BUILD_DIRECTORY, { recursive: true });
  } catch (e) {}
};

export const cloneApp = async () => {
  await simpleGit().clone(REPOSITORY_URL, BUILD_DIRECTORY);
};

export const installNpm = () => {
  execSync(`cd ${BUILD_DIRECTORY} && npm i `);
};

export const buildWindowsPackage = () => {
  execSync(`cd ${BUILD_DIRECTORY} && npm run make `);
};

export const copyWindowsPackageToPath = async (targetPath: string) => {
  fsExtra.copySync(
    `${BUILD_DIRECTORY}/out/${APP_NAME}-win32-x64/`,
    `${targetPath}/${DIRECTORY_NAME_ON_FLASH}`
  );
  fsExtra.copySync(
    `${BUILD_DIRECTORY}/start-app.bat`,
    `${targetPath}/start-app.bat`
  );
};
