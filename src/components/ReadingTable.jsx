import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const decimalFormatter = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toFixed(3);
};

const COLUMN_DEFS = [
  { field: 'accountNumber', headerName: 'Account Number', flex: 1, minWidth: 130 },
  { field: 'addedBillCycle', headerName: 'Bill Cycle', flex: 1, minWidth: 110 },
  { field: 'meterNumber', headerName: 'Meter Number', flex: 1, minWidth: 130 },
  { field: 'kwhTot', headerName: 'kWh Total', flex: 1, minWidth: 110, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhR1', headerName: 'kWh R1', flex: 1, minWidth: 100, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhR2', headerName: 'kWh R2', flex: 1, minWidth: 100, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhR3', headerName: 'kWh R3', flex: 1, minWidth: 100, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhExpTot', headerName: 'kWh Export Total', flex: 1, minWidth: 140, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhR1Exp', headerName: 'kWh R1 Export', flex: 1, minWidth: 130, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhR2Exp', headerName: 'kWh R2 Export', flex: 1, minWidth: 130, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kwhR3Exp', headerName: 'kWh R3 Export', flex: 1, minWidth: 130, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhTot', headerName: 'kVARh Total', flex: 1, minWidth: 120, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhR1', headerName: 'kVARh R1', flex: 1, minWidth: 100, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhR2', headerName: 'kVARh R2', flex: 1, minWidth: 100, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhR3', headerName: 'kVARh R3', flex: 1, minWidth: 100, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhExpTot', headerName: 'kVARh Export Total', flex: 1, minWidth: 160, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhR1Exp', headerName: 'kVARh R1 Export', flex: 1, minWidth: 140, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhR2Exp', headerName: 'kVARh R2 Export', flex: 1, minWidth: 140, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
  { field: 'kvarhR3Exp', headerName: 'kVARh R3 Export', flex: 1, minWidth: 140, type: 'number', valueFormatter: ({ value }) => decimalFormatter(value) },
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
    <Box sx={{ width: '100%', minHeight: 400 }}>
      <DataGrid
        rows={rowsWithId}
        columns={COLUMN_DEFS}
        disableSelectionOnClick
        sortingOrder={['asc', 'desc']}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}
        autoHeight
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            fontWeight: 'bold',
          },
        }}
      />
    </Box>
  );
}
