import * as React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";

import arrow from "../../assets/arrow.png";
import { TourMapTable } from "./table";
import { SectionNumberEditor } from "./section-number-editor";
import { StageNumberEditor } from "./stage-number-editor";
import { JuriesEditor } from "./juries-editor/juries-editor";
import { JuryNumberEditor } from "./jury-number-editor";
import { CommandsNumberEditor } from "./commands-number-editor";

export const BaseInfoBody = () => {
  return (
    <Grid container spacing={2} xs={12}>
      <Grid item xs={8} sm={4} md={4}>
        <SectionNumberEditor />
      </Grid>
      <Grid item xs={1} sm={1} md={1}></Grid>
      <Grid item xs={8} sm={4} md={7}>
        <StageNumberEditor />
      </Grid>

      <Grid item xs={8} sm={4} md={4}>
        <JuryNumberEditor />
      </Grid>
      <Grid item xs={8} sm={1} md={1}>
        <img src={arrow} alt="arrow-right" className="arrow-right" />
      </Grid>
      <Grid item xs={1} sm={4} md={7}>
        <JuriesEditor />
      </Grid>

      <Grid item xs={8} sm={4}>
        <CommandsNumberEditor />
      </Grid>
      <Grid item xs={1} sm={1}>
        <img src={arrow} alt="arrow-right" className="arrow-right" />
      </Grid>
      <Grid item xs={12} sm={4} md={7}>
        <Paper elevation={1} className="tournament-control">
          <TableContainer component={Paper} className="counter-body">
            <TourMapTable />
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};
