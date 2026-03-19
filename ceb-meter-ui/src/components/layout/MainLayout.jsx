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
          padding: 3,
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        {children}
      </Box>

    </Box>
  );
}

export default MainLayout;