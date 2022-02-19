import {
  buildWindowsPackage,
  cloneApp,
  copyWindowsPackageToPath,
  deleteBuildDir,
  installNpm,
} from "./build-app";

describe("build app", function () {
  //   it("delete build dir app", function () {
  //     expect(deleteBuildDir());
  //   });
  //   it("clone app", async function () {
  //     expect(await cloneApp());
  //   });
  //   it("npm install", function () {
  //     expect(installNpm());
  //   });
  //   it("build windows package", function () {
  //     expect(buildWindowsPackage());
  //   });
  it("copy package to flash", function () {
    expect(copyWindowsPackageToPath("./temp/test_flash/"));
  });
  //   it("delete build dir app", function () {
  //     expect(deleteBuildDir());
  //   });
});
