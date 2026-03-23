import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import FailedBulkReadingsTable from "../components/FailedBulkReadingsTable";

function ManualBulk() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Manual Readings - Bulk
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FailedBulkReadingsTable />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManualBulk;
