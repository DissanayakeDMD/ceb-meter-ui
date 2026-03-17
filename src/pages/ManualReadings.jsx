import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FailedReadingTable from '../components/FailedReadingTable';

function ManualReadings() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Manual Readings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FailedReadingTable />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ManualReadings;