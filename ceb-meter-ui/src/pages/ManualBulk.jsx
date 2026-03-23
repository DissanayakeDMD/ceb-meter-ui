import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FailedBulkReadingsTable from "../components/FailedBulkReadingsTable";

function ManualBulk() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={1.5} sx={{ width: "100%" }}>
        <Typography variant="h5" component="h2">
          Manual Readings - Bulk
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <FailedBulkReadingsTable />
        </Box>
      </Stack>
    </Box>
  );
}

export default ManualBulk;
