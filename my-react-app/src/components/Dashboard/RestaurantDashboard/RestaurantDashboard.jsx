import React, { useState, useMemo,useEffect } from "react";
import {Box,Drawer,List,ListItemButton,ListItemIcon,ListItemText,IconButton,AppBar,Toolbar,Typography,Button,CssBaseline,Tooltip,} from "@mui/material";
import {Menu as MenuIcon,Dashboard as DashboardIcon,Restaurant as RestaurantIcon,ReceiptLong as OrdersIcon,People as CustomersIcon,BarChart as ReportsIcon,Settings as SettingsIcon,Help as HelpIcon,Notifications as NotificationsIcon,Brightness4,Brightness7,AccountCircle as AccountCircleIcon,} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Home from "./DashboardSidebar/Home";
import MenuManagement from "./DashboardSidebar/MenuManagement";
import Order from "./DashboardSidebar/Orders";
import Customers from "./DashboardSidebar/Customers";
import Reports from "./DashboardSidebar/Reports";
import Profile from "./DashboardSidebar/Profile";
import Settings from "./DashboardSidebar/Settings";
import Support from "./DashboardSidebar/Support";
const expandedWidth = 250;
const collapsedWidth = 80;
const RestaurantDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const muiTheme = useMemo(() =>createTheme({palette: { mode: darkMode ? "dark" : "light" },}),[darkMode]);
  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Menu Management", icon: <RestaurantIcon /> },
    { label: "Orders", icon: <OrdersIcon /> },
    { label: "Customers", icon: <CustomersIcon /> },
    { label: "Reports", icon: <ReportsIcon /> },
    { label: "Profile", icon: <AccountCircleIcon /> },
    { label: "Settings", icon: <SettingsIcon /> },
    { label: "Support", icon: <HelpIcon /> },
  ];
  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("access_token");
    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // console.log("Token in CustomerDashboard:", token);
    if (!token) {
      navigate("/");
    } else {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role !== "restaurant") {
          localStorage.clear();
          navigate("/");
        }
      } catch (error) {
        localStorage.clear();
        navigate("/");
      }
    }
  }, [navigate]);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            height: "90px",
            background: darkMode
              ? "#1f1f1f"
              : "linear-gradient(90deg, #1517b3ff, #0072ff)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            width: "100%",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ marginTop: "10px" }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Restaurant Dashboard
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: collapsed ? collapsedWidth : expandedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: collapsed ? collapsedWidth : expandedWidth,
              marginTop: "90px",
              height: "calc(100vh - 90px)",
              background: darkMode ? "#1e1e1e" : "#fff",
              transition: "width 0.3s ease",
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            },
          }}
        >
          <Box sx={{ p: 1, position: "relative" }}>
            <IconButton
              onClick={handleToggleSidebar}
              sx={{
                position: "absolute",
                top: 1,
                right: collapsed ? 8 : 12,
                zIndex: 10,
                "&:hover": { background: "#c1cddaff" },
                borderRadius: 2,
                my: 1,
              }}
            >
            <MenuIcon />
            </IconButton>
            <List sx={{ mt: 5 }}>
              {menuItems.map((item) => (
                <Tooltip
                  key={item.label}
                  title={collapsed ? item.label : ""}
                  placement="right"
                >
                  <ListItemButton
                    selected={selectedMenuItem === item.label}
                    onClick={() => {
                      if (collapsed) setCollapsed(false);
                      setSelectedMenuItem(item.label);
                    }}
                    sx={{
                      justifyContent: collapsed ? "center" : "flex-start",
                      borderRadius: 2,
                      mb: 1,
                      px: collapsed ? 2 : 3,
                      position: "relative",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #1e3a8a, #3b82f6, #06b6d4)",
                        color: "#fff",
                        "& .MuiListItemIcon-root": { color: "#fff" },
                      },
                      "&.Mui-selected": {
                        background:
                          "linear-gradient(to right, #1e3a8a, #3b82f6, #06b6d4)",
                        color: "#fff",
                        "& .MuiListItemIcon-root": { color: "#fff" },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          transition: "top 0.3s ease",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? "auto" : "40px",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </Tooltip>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "90px",
            transition: "all 0.3s ease",
            minHeight: "calc(100vh - 90px)",
          }}
        >
          {selectedMenuItem === "Dashboard" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Home/>
            </Box>
          )}
          {selectedMenuItem === "Menu Management" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
             <MenuManagement/>
            </Box>
          )}
          {selectedMenuItem === "Orders" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Order/>
            </Box>
          )}
          {selectedMenuItem === "Customers" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Customers/>
            </Box>
          )}
          {selectedMenuItem === "Reports" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Reports/>
            </Box>
          )}
          {selectedMenuItem === "Profile" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Profile/>
            </Box>
          )}
          {selectedMenuItem === "Settings" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Settings/>
            </Box>
          )}
          {selectedMenuItem === "Support" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Support/>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default RestaurantDashboard;
