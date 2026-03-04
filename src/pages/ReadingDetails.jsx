import React, { useMemo, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import ReadingTable from '../components/ReadingTable';

const DEFAULT_SELECTED_COLUMNS = [
  'accountNumber',
  'addedBillCycle',
  'meterNumber',
  'kwhTot',
  'kvarhTot',
];

const AVAILABLE_COLUMNS = [
  { field: 'accountNumber', label: 'Account Number' },
  { field: 'addedBillCycle', label: 'Bill Cycle' },
  { field: 'meterNumber', label: 'Meter Number' },
  { field: 'kwhTot', label: 'kWh Total' },
  { field: 'kwhR1', label: 'kWh R1' },
  { field: 'kwhR2', label: 'kWh R2' },
  { field: 'kwhR3', label: 'kWh R3' },
  { field: 'kwhExpTot', label: 'kWh Export Total' },
  { field: 'kwhR1Exp', label: 'kWh R1 Export' },
  { field: 'kwhR2Exp', label: 'kWh R2 Export' },
  { field: 'kwhR3Exp', label: 'kWh R3 Export' },
  { field: 'kvarhTot', label: 'kVARh Total' },
  { field: 'kvarhR1', label: 'kVARh R1' },
  { field: 'kvarhR2', label: 'kVARh R2' },
  { field: 'kvarhR3', label: 'kVARh R3' },
  { field: 'kvarhExpTot', label: 'kVARh Export Total' },
  { field: 'kvarhR1Exp', label: 'kVARh R1 Export' },
  { field: 'kvarhR2Exp', label: 'kVARh R2 Export' },
  { field: 'kvarhR3Exp', label: 'kVARh R3 Export' },
];

// Replace these with your real option sources if needed.
const BILL_CYCLE_OPTIONS = ['202401', '202402', '202403'];
const ACCOUNT_NUMBER_OPTIONS = ['All', '100001', '100002', '100003'];

export default function ReadingDetails() {
  const [selectedBillCycle, setSelectedBillCycle] = useState('');
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('All');
  const [selectedColumns, setSelectedColumns] = useState(
    DEFAULT_SELECTED_COLUMNS
  );

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedColumnSet = useMemo(
    () => new Set(selectedColumns),
    [selectedColumns]
  );

  const toggleColumn = (field) => {
    setSelectedColumns((prev) =>
      prev.includes(field) ? prev.filter((c) => c !== field) : [...prev, field]
    );
  };

  const handleSearch = async () => {
    if (!selectedBillCycle) {
      setError('Please select a Bill Cycle.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const accountNumberParam =
        selectedAccountNumber === 'All' ? '' : selectedAccountNumber;

      const res = await axios.get('https://localhost:7221/api/readings', {
        params: {
          billCycle: selectedBillCycle,
          accountNumber: accountNumberParam,
        },
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setRows(data);
    } catch (e) {
      setError('Failed to fetch readings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Filters section */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="bill-cycle-select-label">
                  Bill Cycle
                </InputLabel>
                <Select
                  labelId="bill-cycle-select-label"
                  label="Bill Cycle"
                  value={selectedBillCycle}
                  onChange={(e) => setSelectedBillCycle(e.target.value)}
                >
                  {BILL_CYCLE_OPTIONS.map((bc) => (
                    <MenuItem key={bc} value={bc}>
                      {bc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={5} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="account-number-select-label">
                  Account Number
                </InputLabel>
                <Select
                  labelId="account-number-select-label"
                  label="Account Number"
                  value={selectedAccountNumber}
                  onChange={(e) => setSelectedAccountNumber(e.target.value)}
                >
                  {ACCOUNT_NUMBER_OPTIONS.map((acc) => (
                    <MenuItem key={acc} value={acc}>
                      {acc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2} md={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearch}
                disabled={loading}
              >
                Search
              </Button>
            </Grid>

            <Grid item xs={12} md={2}>
              {loading ? <CircularProgress size={24} /> : null}
            </Grid>
          </Grid>

          {error ? (
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            </Grid>
          ) : null}
        </Paper>
      </Grid>

      {/* Column selection panel */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Column Selection
          </Typography>
          <FormGroup row>
            {AVAILABLE_COLUMNS.map(({ field, label }) => (
              <FormControlLabel
                key={field}
                label={label}
                control={
                  <Checkbox
                    checked={selectedColumnSet.has(field)}
                    onChange={() => toggleColumn(field)}
                  />
                }
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>

      {/* Data grid */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <ReadingTable rows={rows} selectedColumns={selectedColumns} />
        </Paper>
      </Grid>
    </Grid>
  );
}