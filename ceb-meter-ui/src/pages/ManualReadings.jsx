import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FailedReadingTable from "../components/FailedReadingTable";

function ManualReadings() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={1.5} sx={{ width: "100%" }}>
        <Typography variant="h5" component="h2">
          Manual Readings
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <FailedReadingTable />
        </Box>
      </Stack>
    </Box>
  );
}

export default ManualReadings;