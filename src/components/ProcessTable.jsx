import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const STATUS_LABELS = {
  0: "Running",
  1: "Completed",
  2: "Failed",
};

const PIE_COLORS = ["#4caf50", "#f44336", "#ff9800"];

function formatBillMonth(relatedMonth) {
  const d = new Date(relatedMonth);
  if (Number.isNaN(d.getTime())) return relatedMonth || "";
  const year = d.getFullYear();
  const month = d.toLocaleString("en-US", { month: "short" });
  return `${year} ${month}`;
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function buildPieData(row) {
  const success = row.successCount ?? 0;
  const failed = row.failedCount ?? 0;
  const pending = row.pendingCount ?? 0;
  const total = success + failed + pending || row.totalCount || 0;

  return {
    total,
    segments: [
      { name: "Success", value: success },
      { name: "Failed", value: failed },
      { name: "Pending", value: pending },
    ],
  };
}

const ProcessTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("https://localhost:7221/api/process");
        if (!cancelled) {
          setRows(res.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load process data");
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 4,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography color="error" sx={{ py: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: "none" }}>Process ID</TableCell>
                <TableCell>Bill Month</TableCell>
                <TableCell>Bill Cycle</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell align="center">Progress</TableCell>
                <TableCell>Process Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const { total, segments } = buildPieData(row);
                const statusLabel = STATUS_LABELS[row.processStatus] ?? row.processStatus;

                return (
                  <TableRow key={row.processId}>
                    <TableCell sx={{ display: "none" }}>{row.processId}</TableCell>
                    <TableCell>{formatBillMonth(row.relatedMonth)}</TableCell>
                    <TableCell>{row.relatedBillcycle}</TableCell>
                    <TableCell>{formatShortDate(row.processStartDt)}</TableCell>
                    <TableCell>{formatShortDate(row.processEndDt)}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <PieChart width={80} height={80}>
                          <Pie
                            data={segments}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={30}
                          >
                            {segments.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={PIE_COLORS[index % PIE_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => [
                              value,
                              name,
                            ]}
                          />
                        </PieChart>
                        <Box sx={{ fontSize: 12 }}>
                          <div>Total: {total}</div>
                          <div style={{ color: PIE_COLORS[0] }}>
                            S: {segments[0].value}
                          </div>
                          <div style={{ color: PIE_COLORS[1] }}>
                            F: {segments[1].value}
                          </div>
                          <div style={{ color: PIE_COLORS[2] }}>
                            P: {segments[2].value}
                          </div>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{statusLabel}</TableCell>
                  </TableRow>
                );
              })}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No process data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProcessTable;

