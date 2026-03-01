import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedIcon from "@mui/icons-material/Speed";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useLocation } from "react-router-dom";
import cebLogo from "../../assets/ceb-logo.png";

const drawerWidth = 260;

const menuItems = [
  { path: "/", label: "Process Details", icon: <DashboardIcon /> },
  { path: "/reading", label: "Reading Details", icon: <SpeedIcon /> },
  { path: "/manual", label: "Manual Readings", icon: <EditIcon /> },
];

function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          px: 2,
        }}
      >
        <img src={cebLogo} alt="CEB Logo" width="80" />
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Meter Management
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 2 }}>
        {menuItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={path}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? "primary.contrastText" : "action.active",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9375rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
