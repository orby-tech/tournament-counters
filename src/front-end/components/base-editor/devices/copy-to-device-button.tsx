import { Button, CircularProgress } from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { Device } from "../../../../common/models/device";
import { IPC_SERVER_SIDE_EVENTS } from "../../../../common/constants/ipc-events";
import { locMap } from "../../../../front-end/locale/i18n";
import { useTranslation } from "react-i18next";

import {
  CopyAppEventsType,
  COPY_APP_EVENTS,
} from "../../../../common/constants/threads-events";
import { useAppSelector } from "../../../../front-end/hooks";

export function CopyToDeviceButton({ device }: { device: Device }) {
  const { t } = useTranslation();

  const buildState = useAppSelector<CopyAppEventsType>(
    (state) => state.devicesSlice.copyState
  );
  const writeAppToFlash = (flash: Device) => {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.write_app_to_flash, flash);
  };
  if (buildState !== COPY_APP_EVENTS.endCoping) {
    return <CircularProgress />;
  }
  return (
    <Button onClick={() => writeAppToFlash(device)}>
      {t(locMap.buttons.write_app)}
    </Button>
  );
}
