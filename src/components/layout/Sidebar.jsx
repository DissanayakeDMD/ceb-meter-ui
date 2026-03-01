import { Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import cebLogo from "../../assets/ceb-logo.png";

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ textAlign: "center", p: 3 }}>
        <img src={cebLogo} alt="CEB Logo" width="80" />
      </Box>

      <List>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Process Details" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/reading">
            <ListItemText primary="Reading Details" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/manual">
            <ListItemText primary="Manual Readings" />
          </ListItemButton>
        </ListItem>

      </List>
    </Drawer>
  );
}

export default Sidebar;