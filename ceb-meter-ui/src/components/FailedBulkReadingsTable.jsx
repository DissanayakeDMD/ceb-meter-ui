import React from "react";
import FailedReadingTable from "./FailedReadingTable";

export default function FailedBulkReadingsTable() {
  return (
    <FailedReadingTable
      listApiUrl="https://localhost:7221/api/readings/FailedBulkReadings"
    />
  );
}

