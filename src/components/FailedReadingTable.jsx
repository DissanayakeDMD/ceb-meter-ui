import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Typography,
  Divider,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const readingNumericColumn = (field, headerName, minWidth) => ({
  field,
  headerName,
  flex: 1,
  minWidth,
  align: 'right',
  headerAlign: 'right',
  renderCell: (params) => {
    const value = params.row[field];

    if (value === null || value === undefined || value === '') {
      return '';
    }

    const num = Number(value);
    if (Number.isNaN(num)) return '';

    return num.toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  },
});

const FAILED_COLUMNS = [
  { field: 'accountNumber', headerName: 'Account Number', flex: 1, minWidth: 140 },
  { field: 'meterNumber', headerName: 'Meter Number', flex: 1, minWidth: 140 },
  { field: 'billCycle', headerName: 'Bill Cycle', flex: 1, minWidth: 110 },
  { field: 'billMonth', headerName: 'Bill Month', flex: 1, minWidth: 130 },
  {
    field: 'serviceErrorMessage',
    headerName: 'Service Error Message',
    flex: 2,
    minWidth: 220,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    filterable: false,
    minWidth: 140,
    renderCell: (params) => params.value,
  },
];

export default function FailedReadingTable() {
  const [failedRows, setFailedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dialogError, setDialogError] = useState(null);
  const [selectedContext, setSelectedContext] = useState({
    accountNumber: '',
    meterNumber: '',
    billCycle: '',
  });

  const [readingStatus, setReadingStatus] = useState(null);
  const [readingData, setReadingData] = useState(null);
  const [readingReason, setReadingReason] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    const fetchFailedReadings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://localhost:7221/api/readings/FailedReadings');
        const data = Array.isArray(response.data) ? response.data : [];
        const withId = data.map((item) => ({
          ...item,
          id: `${item.accountNumber}-${item.meterNumber}`,
        }));

        setFailedRows(withId);
      } catch (err) {
        setError('Failed to load failed readings.');
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFailedReadings();
  }, []);

  const handleGetReading = async (row) => {
    const { billCycle, billMonth, accountNumber, meterNumber } = row;
    setSelectedContext({ billCycle, accountNumber, meterNumber });
    setDialogOpen(true);
    setDialogLoading(true);
    setDialogError(null);
    setReadingStatus(null);
    setReadingData(null);
    setReadingReason(null);
    setSendLoading(false);
    setSendError(null);
    setSendSuccess(false);

    try {
      const response = await axios.post(
        'https://localhost:7221/api/readings/GetHesReading',
        {
          meterNumber,
          accountNumber,
          yearMonth: billMonth
        }
      );

      const result = response.data?.result?.[0];

      if (!result || result.reading_status !== 'success') {
        setReadingStatus(result?.reading_status || 'failed');
        setReadingReason(result?.message || 'No Readings');
        setReadingData(null);
      } else {
        setReadingStatus('success');
        setReadingData(result.data);
        setReadingReason(null);
      }
    } catch (err) {
      setDialogError('Failed to load readings.');
      setReadingStatus('failed');
      setReadingReason('No Readings');
      setReadingData(null);
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogError(null);
    setReadingStatus(null);
    setReadingData(null);
    setReadingReason(null);
    setSendLoading(false);
    setSendError(null);
    setSendSuccess(false);
  };

  const handleSendReading = async () => {
    if (!readingData || readingStatus !== 'success') return;

    setSendLoading(true);
    setSendError(null);
    setSendSuccess(false);

    try {
      await axios.post('https://localhost:7221/api/readings/SaveHesReading', {
        accountNumber: selectedContext.accountNumber,
        meterNumber: selectedContext.meterNumber,
        billCycle: selectedContext.billCycle,
        ...readingData,
      });
      setSendSuccess(true);
    } catch (err) {
      setSendError('Failed to send readings to backend.');
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSendLoading(false);
    }
  };

  const failedTableRows = useMemo(
    () =>
      failedRows.map((row) => ({
        ...row,
        action: (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleGetReading(row)}
          >
            Get Reading
          </Button>
        ),
      })),
    [failedRows]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rows={failedTableRows}
                columns={FAILED_COLUMNS}
                loading={loading}
                disableRowSelectionOnClick
                sortingOrder={['asc', 'desc']}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                }}
                pageSizeOptions={[10]}
                autoHeight
                slots={{ toolbar: GridToolbar }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    fontWeight: 'bold',
                  },
                }}
              />
              {loading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          Readings for Account {selectedContext.accountNumber} / Meter{' '}
          {selectedContext.meterNumber} (Bill Cycle {selectedContext.billCycle})
        </DialogTitle>
        <DialogContent dividers>
          {sendError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {sendError}
            </Alert>
          )}
          {sendSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Readings have been sent to backend successfully.
            </Alert>
          )}
          {dialogError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {dialogError}
            </Alert>
          )}
          {dialogLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ mt: 1 }}>
              {readingStatus && readingStatus !== 'success' && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Readings for Account {selectedContext.accountNumber}
                  </Typography>
                  <Typography>
                    Meter Number: {selectedContext.meterNumber}
                  </Typography>
                  <Typography>
                    Reason: {readingReason || 'No Readings'}
                  </Typography>
                </Alert>
              )}

              {readingStatus === 'success' && readingData && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Header
                    </Typography>
                    <Typography>
                      Meter Number: {selectedContext.meterNumber}
                    </Typography>
                    <Typography>
                      Reading Date: {readingData.reading_date}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Active Energy
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" gutterBottom>
                          Import
                        </Typography>
                        <Typography>kWh Total: {readingData.kwh_tot}</Typography>
                        <Typography>R1: {readingData.kwh_r1}</Typography>
                        <Typography>R2: {readingData.kwh_r2}</Typography>
                        <Typography>R3: {readingData.kwh_r3}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" gutterBottom>
                          Export
                        </Typography>
                        <Typography>
                          kWh Exp Total: {readingData.kwh_exp_tot}
                        </Typography>
                        <Typography>R1 Exp: {readingData.kwh_r1_exp}</Typography>
                        <Typography>R2 Exp: {readingData.kwh_r2_exp}</Typography>
                        <Typography>R3 Exp: {readingData.kwh_r3_exp}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Reactive Energy
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" gutterBottom>
                          Import
                        </Typography>
                        <Typography>
                          kvarh Total: {readingData.kvarh_tot}
                        </Typography>
                        <Typography>R1: {readingData.kvarh_r1}</Typography>
                        <Typography>R2: {readingData.kvarh_r2}</Typography>
                        <Typography>R3: {readingData.kvarh_r3}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" gutterBottom>
                          Export
                        </Typography>
                        <Typography>
                          kvarh Exp Total: {readingData.kvarh_exp_tot}
                        </Typography>
                        <Typography>
                          R1 Exp: {readingData.kvarh_r1_exp}
                        </Typography>
                        <Typography>
                          R2 Exp: {readingData.kvarh_r2_exp}
                        </Typography>
                        <Typography>
                          R3 Exp: {readingData.kvarh_r3_exp}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Max Demand
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" gutterBottom>
                          Import
                        </Typography>
                        <Typography>
                          max_dmnd: {readingData.max_dmnd}
                        </Typography>
                        <Typography>
                          max_dmnd_Time: {readingData.max_dmnd_Time}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" gutterBottom>
                          Export
                        </Typography>
                        <Typography>
                          max_dmnd_exp: {readingData.max_dmnd_exp}
                        </Typography>
                        <Typography>
                          max_dmnd_exp_Time: {readingData.max_dmnd_exp_Time}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {readingStatus === 'success' && readingData && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendReading}
              disabled={sendLoading}
            >
              {sendLoading ? 'Sending...' : 'Send Readings'}
            </Button>
          )}
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

