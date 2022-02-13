import * as React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  Box,
} from "@material-ui/core";
import { CounterBodyTableHeader } from "./table-header";
import { JuriesHeadersRow } from "./rows/table-headers-row";
import { Row } from "./rows/row";
import { Divider } from "@mui/material";
import { TourSelector } from "./tour-selector";
import { Rule } from "../../common/models/rule.model";

export const CounterBody = () => {
  return (
    <Box>
      <Paper elevation={3}>
        <TableContainer component={Paper} className="counter-body">
          <Table>
            <CounterBodyTableHeader />
            <TableBody>
              <JuriesHeadersRow />
              <Row rule={Rule.reporter} />
              <Row rule={Rule.opposition} />
              <Row rule={Rule.revier} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Divider variant="middle" />

      <Paper elevation={3}>
        <TourSelector />
      </Paper>
    </Box>
  );
};
