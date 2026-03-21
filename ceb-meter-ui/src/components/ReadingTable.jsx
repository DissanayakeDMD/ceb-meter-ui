import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const numericColumn = (field, headerName, minWidth) => ({
  field,
  headerName,
  flex: 1,
  minWidth,
  align: "right",
  headerAlign: "right",
  renderCell: (params) => {
    const value = params.row[field];

    if (value === null || value === undefined || value === "") {
      return "";
    }

    const num = Number(value);
    if (Number.isNaN(num)) return "";

    return num.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  },
});

const COLUMN_DEFS = [
  { field: "accountNumber", headerName: "Account Number", flex: 1, minWidth: 130 },
  { field: "addedBillCycle", headerName: "Bill Cycle", flex: 1, minWidth: 110 },
  { field: "meterNumber", headerName: "Meter Number", flex: 1, minWidth: 130 },
  numericColumn("kwhTot", "kWh Total", 110),
  numericColumn("kwhR1", "kWh R1", 100),
  numericColumn("kwhR2", "kWh R2", 100),
  numericColumn("kwhR3", "kWh R3", 100),
  numericColumn("kwhExpTot", "kWh Export Total", 140),
  numericColumn("kwhR1Exp", "kWh R1 Export", 130),
  numericColumn("kwhR2Exp", "kWh R2 Export", 130),
  numericColumn("kwhR3Exp", "kWh R3 Export", 130),
  numericColumn("kvarhTot", "kVARh Total", 120),
  numericColumn("kvarhR1", "kVARh R1", 100),
  numericColumn("kvarhR2", "kVARh R2", 100),
  numericColumn("kvarhR3", "kVARh R3", 100),
  numericColumn("kvarhExpTot", "kVARh Export Total", 160),
  numericColumn("kvarhR1Exp", "kVARh R1 Export", 140),
  numericColumn("kvarhR2Exp", "kVARh R2 Export", 140),
  numericColumn("kvarhR3Exp", "kVARh R3 Export", 140),
];

export default function ReadingTable({ rows }) {
  const rowsWithId = useMemo(
    () =>
      (rows || []).map((row, index) => ({
        ...row,
        id:
          row.accountNumber != null && row.meterNumber != null
            ? `${row.accountNumber}-${row.meterNumber}-${index}`
            : row.id ?? index,
      })),
    [rows]
  );

  return (
    <Box sx={{ width: "100%", minHeight: 400 }}>
      <DataGrid
        rows={rowsWithId}
        columns={COLUMN_DEFS}
        disableSelectionOnClick
        sortingOrder={["asc", "desc"]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
          columns: {
            columnVisibilityModel: {
              accountNumber: true,
              addedBillCycle: true,
              meterNumber: true,
              kwhTot: true,
              kwhR1: true,
              kwhR2: true,
              kwhR3: true,
              kwhExpTot: false,
              kwhR1Exp: false,
              kwhR2Exp: false,
              kwhR3Exp: false,
              kvarhTot: false,
              kvarhR1: false,
              kvarhR2: false,
              kvarhR3: false,
              kvarhExpTot: false,
              kvarhR1Exp: false,
              kvarhR2Exp: false,
              kvarhR3Exp: false,
            },
          },
        }}
        pageSizeOptions={[10]}
        autoHeight
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}
