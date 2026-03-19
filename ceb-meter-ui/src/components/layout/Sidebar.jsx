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
      {
        label: "Ordinary",
        path: "/process/ordinary-colombo", // ProcessDetails.jsx
      },
      {
        label: "Bulk",
        path: "/process/bulk", // BulkProcess.jsx
      },
      {
        label: "Bess",
        path: "/process/bess", // BessProcess.jsx
      },
    ],
  },
  {
    label: "Reading Details",
    icon: <SpeedIcon />,
    children: [
      {
        label: "Ordinary",
        path: "/reading/ordinary", // ReadingOrdinary.jsx
      },
      {
        label: "Bulk",
        path: "/reading/bulk", // ReadingBulk.jsx
      },
      {
        label: "Bess",
        path: "/reading/bess", // ReadingBess.jsx
      },
    ],
  },
  {
    label: "Manual Readings",
    icon: <EditIcon />,
    children: [
      {
        label: "Ordinary",
        path: "/manual/ordinary", // ManualOrdinary.jsx
      },
      {
        label: "Bulk",
        path: "/manual/bulk", // ManualBulk.jsx
      },
      {
        label: "Bess",
        path: "/manual/bess", // ManualBess.jsx
      },
    ],
  },
];

function Sidebar() {
  const location = useLocation();
  const [openStates, setOpenStates] = useState({});

  const handleToggle = (label) => {
    setOpenStates((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
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
          background: "linear-gradient(180deg, #041424 0%, #060b11 40%, #020308 100%)",
          color: "rgba(255,255,255,0.86)",
          overflowY: "auto",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0.5,
          py: 2,
          px: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img src={cebLogo} alt="CEB Logo" style={{ width: 32, height: 32 }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ letterSpacing: 0.6, fontWeight: 600, textTransform: "uppercase" }}
            >
              CEB Meter
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 0.4 }}
            >
              Meter Management
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <List
        sx={{
          px: 1,
          py: 1,
          "& .MuiListItemButton-root": {
            transition: "background-color 0.15s ease, transform 0.1s ease",
          },
          "& .MuiListItemButton-root:hover": {
            backgroundColor: "rgba(255,255,255,0.06)",
          },
        }}
      >
        {menuConfig.map((parent) => {
          const hasChildren = !!parent.children?.length;
          const isChildActive = hasChildren
            ? parent.children.some((child) => isPathActive(child.path))
            : isPathActive(parent.path);
          const isOpen =
            openStates[parent.label] !== undefined
              ? openStates[parent.label]
              : isChildActive;

          return (
            <Box key={parent.label} sx={{ mb: 0.25 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => hasChildren && handleToggle(parent.label)}
                  selected={isChildActive}
                  sx={{
                    borderRadius: 1.5,
                    px: 1.25,
                    py: 0.6,
                    "&.Mui-selected": {
                      backgroundColor: "rgba(14, 116, 255, 0.18)",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "rgba(14, 116, 255, 0.26)",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "#ffffff",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isChildActive
                        ? "#ffffff"
                        : "rgba(255,255,255,0.7)",
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
                  {hasChildren &&
                    (isOpen ? (
                      <ExpandLess sx={{ color: "rgba(255,255,255,0.7)" }} />
                    ) : (
                      <ExpandMore sx={{ color: "rgba(255,255,255,0.7)" }} />
                    ))}
                </ListItemButton>
              </ListItem>

              {hasChildren && (
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
                                backgroundColor: "rgba(14, 116, 255, 0.3)",
                                color: "#ffffff",
                                "&:hover": {
                                  backgroundColor: "rgba(14, 116, 255, 0.38)",
                                },
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
              )}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;