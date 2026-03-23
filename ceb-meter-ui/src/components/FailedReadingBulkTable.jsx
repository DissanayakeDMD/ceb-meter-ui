import React from 'react';
import FailedReadingTable from './FailedReadingTable';

const FAILED_BULK_READINGS_API =
  'https://localhost:7221/api/readings/FailedBulkReadings';

/**
 * Same UI/behavior as FailedReadingTable; loads failed rows from FailedBulkReadings.
 */
export default function FailedReadingBulkTable() {
  return <FailedReadingTable listApiUrl={FAILED_BULK_READINGS_API} />;
}
