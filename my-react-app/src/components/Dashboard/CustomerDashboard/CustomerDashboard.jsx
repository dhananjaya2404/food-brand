import React, { useState, useMemo } from "react";
import {Box,Drawer,List,ListItemButton,ListItemIcon,ListItemText,IconButton,AppBar,Toolbar,Typography,Button,CssBaseline,Tooltip,} from "@mui/material";
import {Menu as MenuIcon,Home as HomeIcon,RestaurantMenu as RestaurantMenuIcon,ReceiptLong as ReceiptLongIcon,ShoppingCart as ShoppingCartIcon,Favorite as FavoriteIcon,AccountCircle as AccountCircleIcon,Help as HelpIcon,Notifications as NotificationsIcon,Brightness4,Brightness7,} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const expandedWidth = 250;
const collapsedWidth = 80;
import { useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Menu from "./CustomerSidebar/Menu";
import MenuCart from "./CustomerSidebar/MenuCart";
const CustomerDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const muiTheme = useMemo(() =>createTheme({palette: { mode: darkMode ? "dark" : "light" },}),[darkMode]);
  const menuItems = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Menu", icon: <RestaurantMenuIcon /> },
    { label: "Cart", icon: <ShoppingCartIcon /> },
    { label: "Orders", icon: <ReceiptLongIcon /> },
    { label: "Favorites", icon: <FavoriteIcon /> },
    { label: "Profile", icon: <AccountCircleIcon /> },
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
        if (decoded.role !== "user") {
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
              Customer Dashboard
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
          {selectedMenuItem === "Home" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Welcome Back!</Typography>
              <Typography>Check out today's specials and promotions.</Typography>
            </Box>
          )}
          {selectedMenuItem === "Menu" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Menu/>
            </Box>
          )}
          {selectedMenuItem === "Cart" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <MenuCart/>
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
              <Typography variant="h5">Your Orders</Typography>
              <Typography>Track your past and current orders.</Typography>
            </Box>
          )}
          {selectedMenuItem === "Favorites" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: darkMode ? "#1f1f1f" : "#fff",
              }}
            >
              <Typography variant="h5">Favorites</Typography>
              <Typography>Your saved dishes.</Typography>
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
              <Typography variant="h5">Profile</Typography>
              <Typography>Manage your account and settings.</Typography>
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
              <Typography variant="h5">Support</Typography>
              <Typography>Contact support for any issues.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default CustomerDashboard;
