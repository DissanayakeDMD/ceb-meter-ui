import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedIcon from "@mui/icons-material/Speed";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import cebLogo from "../../assets/ceb-logo.png";

const drawerWidth = 260;

const menuConfig = [
  {
    label: "Process Details",
    icon: <DashboardIcon />,
    children: [
      { label: "Ordinary", path: "/process/ordinary-colombo" },
      { label: "Bulk", path: "/process/bulk" },
      { label: "Bess", path: "/process/bess" },
    ],
  },
  {
    label: "Reading Details",
    icon: <SpeedIcon />,
    children: [
      { label: "Ordinary", path: "/reading/ordinary" },
      { label: "Bulk", path: "/reading/bulk" },
      { label: "Bess", path: "/reading/bess" },
    ],
  },
  {
    label: "Manual Readings",
    icon: <EditIcon />,
    children: [
      { label: "Ordinary", path: "/manual/ordinary" },
      { label: "Bulk", path: "/manual/bulk" },
      { label: "Bess", path: "/manual/bess" },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  const [openStates, setOpenStates] = useState({});

  const handleToggle = (label) => {
    setOpenStates((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isPathActive = (path) => location.pathname === path;

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
          overflowY: "auto",
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

      <List sx={{ px: 1, py: 1 }}>
        {menuConfig.map((parent) => {
          const isChildActive = parent.children.some((c) => isPathActive(c.path));
          const isOpen =
            openStates[parent.label] !== undefined
              ? openStates[parent.label]
              : isChildActive;

          return (
            <Box key={parent.label} sx={{ mb: 0.25 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleToggle(parent.label)}
                  selected={isChildActive}
                  sx={{
                    borderRadius: 1.5,
                    px: 1.25,
                    py: 0.6,
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": { backgroundColor: "primary.dark" },
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isChildActive
                        ? "primary.contrastText"
                        : "action.active",
                    }}
                  >
                    {parent.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={parent.label}
                    primaryTypographyProps={{
                      fontWeight: isChildActive ? 600 : 500,
                      fontSize: "0.86rem",
                    }}
                  />
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {parent.children.map((child) => {
                    const childActive = isPathActive(child.path);
                    return (
                      <ListItem key={child.path} disablePadding sx={{ mb: 0.15 }}>
                        <ListItemButton
                          component={Link}
                          to={child.path}
                          selected={childActive}
                          sx={{
                            borderRadius: 1.5,
                            ml: 3.5,
                            pr: 1.5,
                            py: 0.45,
                            "&.Mui-selected": {
                              backgroundColor: "primary.main",
                              color: "primary.contrastText",
                              "&:hover": { backgroundColor: "primary.dark" },
                            },
                          }}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontWeight: childActive ? 600 : 500,
                              fontSize: "0.8rem",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
