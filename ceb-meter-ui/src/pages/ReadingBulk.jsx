import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import BulkReadingTable from "../components/BulkReadingTable";

const BILL_CYCLES_API = "https://localhost:7221/api/readings/billcycles";
const GET_BULK_READINGS_API =
  "https://localhost:7221/api/readings/GetBulkReadings";

function normalizeReadingRow(raw) {
  if (!raw || typeof raw !== "object") return raw;
  return {
    accountNumber: raw.accountNumber ?? raw.AccountNumber,
    addedBillCycle: raw.addedBillCycle ?? raw.AddedBillCycle,
    meterNumber: raw.meterNumber ?? raw.MeterNumber,
    kwhTot: raw.kwhTot ?? raw.KwhTot,
    kwhR1: raw.kwhR1 ?? raw.KwhR1,
    kwhR2: raw.kwhR2 ?? raw.KwhR2,
    kwhR3: raw.kwhR3 ?? raw.KwhR3,
    kwhExpTot: raw.kwhExpTot ?? raw.KwhExpTot,
    kwhR1Exp: raw.kwhR1Exp ?? raw.KwhR1Exp,
    kwhR2Exp: raw.kwhR2Exp ?? raw.KwhR2Exp,
    kwhR3Exp: raw.kwhR3Exp ?? raw.KwhR3Exp,
    kvarhTot: raw.kvarhTot ?? raw.KvarhTot,
    kvarhR1: raw.kvarhR1 ?? raw.KvarhR1,
    kvarhR2: raw.kvarhR2 ?? raw.KvarhR2,
    kvarhR3: raw.kvarhR3 ?? raw.KvarhR3,
    kvarhExpTot: raw.kvarhExpTot ?? raw.KvarhExpTot,
    kvarhR1Exp: raw.kvarhR1Exp ?? raw.KvarhR1Exp,
    kvarhR2Exp: raw.kvarhR2Exp ?? raw.KvarhR2Exp,
    kvarhR3Exp: raw.kvarhR3Exp ?? raw.KvarhR3Exp,
  };
}

const ACCOUNT_ERROR_MSG = "Account number must be a 10 digit number";

export default function ReadingBulk() {
  const [billCycles, setBillCycles] = useState([]);
  const [billCyclesLoading, setBillCyclesLoading] = useState(true);
  const [selectedBillCycle, setSelectedBillCycle] = useState("");
  const [accountNumber, setAccountNumber] = useState("All");
  const [accountError, setAccountError] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const fetchBillCycles = async () => {
      setBillCyclesLoading(true);
      try {
        const res = await axios.get(BILL_CYCLES_API);
        const data = Array.isArray(res.data) ? res.data : [];
        if (!cancelled) {
          setBillCycles(data);
          if (data.length > 0) {
            setSelectedBillCycle((prev) =>
              prev === "" || prev === null || prev === undefined
                ? data[0].billCycle
                : prev
            );
          }
        }
      } catch {
        if (!cancelled) setError("Failed to load bill cycles.");
      } finally {
        if (!cancelled) setBillCyclesLoading(false);
      }
    };
    fetchBillCycles();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAccountChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw.toLowerCase() === "all") {
      setAccountNumber("All");
      setAccountError("");
      return;
    }
    const digitsOnly = raw.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(digitsOnly);
    setAccountError("");
  };

  const validateAccount = () => {
    if (accountNumber === "All") return true;
    if (accountNumber.length !== 10) {
      setAccountError(ACCOUNT_ERROR_MSG);
      return false;
    }
    return true;
  };

  const handleSearch = async () => {
    setError("");
    setAccountError("");
    if (!validateAccount()) return;
    if (!selectedBillCycle && selectedBillCycle !== 0) {
      setError("Please select a Bill Month.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.get(GET_BULK_READINGS_API, {
        params: {
          billCycle: selectedBillCycle,
          accountNumber: accountNumber === "All" ? "All" : accountNumber,
        },
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setRows(data.map(normalizeReadingRow));
    } catch {
      setError("Failed to fetch bulk readings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2} sx={{ width: "100%", alignItems: "stretch" }}>
        <Paper elevation={2} sx={{ p: 2, width: "100%", flexShrink: 0 }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <FormControl fullWidth size="small" disabled={billCyclesLoading}>
                <InputLabel id="bulk-bill-month-select-label">Bill Month</InputLabel>
                <Select
                  labelId="bulk-bill-month-select-label"
                  label="Bill Month"
                  value={selectedBillCycle === "" ? "" : selectedBillCycle}
                  onChange={(e) => setSelectedBillCycle(e.target.value)}
                >
                  {billCycles.map((item) => (
                    <MenuItem key={item.billCycle} value={item.billCycle}>
                      {item.billMonth}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Account Number"
                value={accountNumber}
                onChange={handleAccountChange}
                error={Boolean(accountError)}
                helperText={accountError}
                inputProps={{ maxLength: 10, inputMode: "numeric" }}
                placeholder="All"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: "auto" }} sx={{ minWidth: { sm: 120 } }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearch}
                disabled={loading || billCyclesLoading}
              >
                Search
              </Button>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 12, md: "grow" }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {loading && <CircularProgress size={24} />}
            </Grid>
          </Grid>

          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}
        </Paper>

        <Paper
          elevation={2}
          sx={{ p: 2, width: "100%", minWidth: 0, flex: "1 1 auto" }}
        >
          <BulkReadingTable rows={rows} />
        </Paper>
      </Stack>
    </Box>
  );
}
