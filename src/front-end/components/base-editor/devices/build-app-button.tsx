import {
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ipcRenderer } from "electron";
import { IPC_SERVER_SIDE_EVENTS } from "../../../../common/constants/ipc-events";
import { locMap } from "../../../locale/i18n";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../front-end/hooks";
import {
  buildAppEvents,
  BuildAppEventsType,
} from "../../../../common/constants/threads-events";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export function BuildAppButton() {
  const buildState = useAppSelector<BuildAppEventsType>(
    (state) => state.devicesSlice.buildState
  );
  const { t } = useTranslation();

  const buildApp = () => {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.build_app);
  };

  if (buildState !== buildAppEvents.endBuild) {
    let progress = 10;
    switch (buildState) {
      case buildAppEvents.startBuild:
        progress = 10;
        break;
      case buildAppEvents.deleteOldBuild:
        progress = 20;
        break;
      case buildAppEvents.cloneApp:
        progress = 40;
        break;
      case buildAppEvents.installNPM:
        progress = 60;
        break;
      case buildAppEvents.buildWindowsPacakge:
        progress = 80;
        break;
    }
    return (
      <Tooltip title={buildState}>
        <CircularProgressWithLabel value={progress} />
      </Tooltip>
    );
  }

  return <Button onClick={buildApp}> {t(locMap.buttons.build_app)}</Button>;
}
