import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          p: 3,
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </Box>

    </Box>
  );
}

export default MainLayout;