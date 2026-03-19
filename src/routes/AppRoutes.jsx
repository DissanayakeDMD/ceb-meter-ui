import { Routes, Route } from "react-router-dom";
import ProcessDetails from "../pages/ProcessDetails";
import BulkProcess from "../pages/BulkProcess";
import BessProcess from "../pages/BessProcess";
import ReadingDetails from "../pages/ReadingDetails";
import ReadingOrdinary from "../pages/ReadingOrdinary";
import ReadingBulk from "../pages/ReadingBulk";
import ReadingBess from "../pages/ReadingBess";
import ManualReadings from "../pages/ManualReadings";
import ManualOrdinary from "../pages/ManualOrdinary";
import ManualBulk from "../pages/ManualBulk";
import ManualBess from "../pages/ManualBess";

function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<ProcessDetails />} />

      {/* Process Details */}
      <Route path="/process/ordinary-colombo" element={<ProcessDetails />} />
      <Route path="/process/bulk" element={<BulkProcess />} />
      <Route path="/process/bess" element={<BessProcess />} />

      {/* Reading Details */}
      <Route path="/reading" element={<ReadingDetails />} />
      <Route path="/reading/ordinary" element={<ReadingOrdinary />} />
      <Route path="/reading/bulk" element={<ReadingBulk />} />
      <Route path="/reading/bess" element={<ReadingBess />} />

      {/* Manual Readings */}
      <Route path="/manual" element={<ManualReadings />} />
      <Route path="/manual/ordinary" element={<ManualOrdinary />} />
      <Route path="/manual/bulk" element={<ManualBulk />} />
      <Route path="/manual/bess" element={<ManualBess />} />
    </Routes>
  );
}

export default AppRoutes;