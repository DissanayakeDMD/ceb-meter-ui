import { Routes, Route } from "react-router-dom";
import ProcessDetails from "../pages/ProcessDetails";
import ReadingDetails from "../pages/ReadingDetails";
import ManualReadings from "../pages/ManualReadings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProcessDetails />} />
      <Route path="/reading" element={<ReadingDetails />} />
      <Route path="/manual" element={<ManualReadings />} />
    </Routes>
  );
}

export default AppRoutes;