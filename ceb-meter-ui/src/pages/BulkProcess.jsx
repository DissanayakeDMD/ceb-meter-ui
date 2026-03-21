import { Box, Typography } from "@mui/material";
import ProcessTableBulk from "../components/ProcessTableBulk";

function BulkProcess() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bulk Process Details
      </Typography>
      <ProcessTableBulk />
    </Box>
  );
}

export default BulkProcess;
