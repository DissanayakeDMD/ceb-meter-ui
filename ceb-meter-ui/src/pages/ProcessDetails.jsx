import { Box, Typography } from "@mui/material";
import ProcessTable from "../components/ProcessTable";

function ProcessDetails() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Process Details
      </Typography>
      <ProcessTable />
    </Box>
  );
}

export default ProcessDetails;