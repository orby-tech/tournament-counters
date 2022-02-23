import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ipcRenderer } from "electron";
import * as React from "react";
import { IPC_SERVER_SIDE_EVENTS } from "../../../common/constants/ipc-events";
import { Device } from "../../../common/models/device";
export const COLORS = {
  liteGreen: "#69e169",
  liteRed: "#df8963",
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DatabaseFromOldTournament({ device }: { device: Device }) {
  const [open, setOpen] = React.useState(false);

  const openImportDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const importData = () => {
    ipcRenderer.send(IPC_SERVER_SIDE_EVENTS.import_data_from_flash, device);

    setOpen(false);
  };

  if (!device.databaseFromOldTournament) {
    return <Box sx={{ backgroundColor: COLORS.liteGreen }}>Чисто</Box>;
  }
  return (
    <Box sx={{ backgroundColor: COLORS.liteRed }}>
      <Button onClick={openImportDialog}>
        Остались данные с последнего турнира
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Импорт данных</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Выгрузить данные турнира?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={importData}>Да!</Button>
          <Button onClick={handleClose}>Не сейчас</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
