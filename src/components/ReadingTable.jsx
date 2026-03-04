import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const decimalFormatter = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toFixed(3);
};

const ALL_COLUMN_DEFS = {
  accountNumber: {
    field: 'accountNumber',
    headerName: 'Account Number',
    flex: 1,
    minWidth: 150,
  },
  addedBillCycle: {
    field: 'addedBillCycle',
    headerName: 'Bill Cycle',
    flex: 1,
    minWidth: 130,
  },
  meterNumber: {
    field: 'meterNumber',
    headerName: 'Meter Number',
    flex: 1,
    minWidth: 150,
  },
  kwhTot: {
    field: 'kwhTot',
    headerName: 'kWh Total',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhR1: {
    field: 'kwhR1',
    headerName: 'kWh R1',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhR2: {
    field: 'kwhR2',
    headerName: 'kWh R2',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhR3: {
    field: 'kwhR3',
    headerName: 'kWh R3',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhExpTot: {
    field: 'kwhExpTot',
    headerName: 'kWh Export Total',
    flex: 1,
    minWidth: 150,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhR1Exp: {
    field: 'kwhR1Exp',
    headerName: 'kWh R1 Export',
    flex: 1,
    minWidth: 150,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhR2Exp: {
    field: 'kwhR2Exp',
    headerName: 'kWh R2 Export',
    flex: 1,
    minWidth: 150,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kwhR3Exp: {
    field: 'kwhR3Exp',
    headerName: 'kWh R3 Export',
    flex: 1,
    minWidth: 150,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhTot: {
    field: 'kvarhTot',
    headerName: 'kVARh Total',
    flex: 1,
    minWidth: 150,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhR1: {
    field: 'kvarhR1',
    headerName: 'kVARh R1',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhR2: {
    field: 'kvarhR2',
    headerName: 'kVARh R2',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhR3: {
    field: 'kvarhR3',
    headerName: 'kVARh R3',
    flex: 1,
    minWidth: 130,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhExpTot: {
    field: 'kvarhExpTot',
    headerName: 'kVARh Export Total',
    flex: 1,
    minWidth: 170,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhR1Exp: {
    field: 'kvarhR1Exp',
    headerName: 'kVARh R1 Export',
    flex: 1,
    minWidth: 160,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhR2Exp: {
    field: 'kvarhR2Exp',
    headerName: 'kVARh R2 Export',
    flex: 1,
    minWidth: 160,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
  kvarhR3Exp: {
    field: 'kvarhR3Exp',
    headerName: 'kVARh R3 Export',
    flex: 1,
    minWidth: 160,
    type: 'number',
    valueFormatter: ({ value }) => decimalFormatter(value),
  },
};

const ReadingTable = ({ rows, selectedColumns }) => {
  const columns = useMemo(
    () =>
      (selectedColumns || [])
        .map((field) => ALL_COLUMN_DEFS[field])
        .filter(Boolean),
    [selectedColumns]
  );

  const rowsWithId = useMemo(
    () =>
      (rows || []).map((row, index) => ({
        ...row,
        id:
          row.accountNumber && row.meterNumber
            ? `${row.accountNumber}-${row.meterNumber}`
            : row.id ?? index,
      })),
    [rows]
  );

  return (
    <div style={{ width: '100%', height: 600 }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        disableSelectionOnClick
        sortingOrder={['asc', 'desc']}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight={false}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
};

export default ReadingTable;

