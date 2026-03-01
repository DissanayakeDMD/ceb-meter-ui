import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          height: "100vh",
        }}
      >
        {children}
      </Box>

    </Box>
  );
}

export default MainLayout;