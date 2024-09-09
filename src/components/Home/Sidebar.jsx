import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  useMediaQuery,
  useTheme,
  Link,
  ListItemIcon,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { useSelector, useDispatch } from "react-redux";
import { clearAll } from "../../slice/authSlice";
import { switchTheme } from "../../slice/themeSlice";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const username = useSelector((state) => state.auth.username);
  const isDarkTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleToggle = () => setOpen(!open);

  const handleLogout = () => {
    dispatch(clearAll());
    navigate("/login");
  };

  const handleThemeSwitch = () => {
    dispatch(switchTheme());
  };

  return (
    <>
      {isMobile && !open && (
        <IconButton
          color="primary"
          onClick={handleToggle}
          sx={{
            position: "absolute",
            top: theme.spacing(2),
            left: theme.spacing(2),
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={isMobile ? open : true} // Always open on larger screens
        onClose={isMobile ? handleToggle : undefined} // Only handle toggle on mobile
        sx={{
          width: 250,
          height: "100vh", // Full height
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            position: isMobile ? "relative" : "fixed", // Fixed on larger screens
            top: 0,
            left: 0,
            borderRadius: 0, // Remove border radius
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary, // Use theme's text color
            display: "flex",
            flexDirection: "column",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"} // Temporary for mobile, persistent for larger screens
      >
        <Card
          sx={{
            margin: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            padding: "0",
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText
              primary={username}
              sx={{
                textAlign: "right",
                color: theme.palette.primary.main,
                marginRight: theme.spacing(2),
              }}
            />
          </CardContent>
        </Card>
        <List
          sx={{
            flexGrow: 1, // Take up available space
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Upload */}
          <ListItem key="upload" disablePadding>
            <Link
              to="/upload"
              component={RouterLink}
              underline="none"
              width="100%"
            >
              <ListItemButton
                sx={{
                  "&.Mui-selected": {
                    bgcolor: theme.palette.primary.light, // Use theme's primary color for selected state
                    color: theme.palette.primary.contrastText,
                  },
                  "&:hover": {
                    bgcolor: theme.palette.primary.main, // Use theme's primary color for hover state
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <ListItemText primary="Upload" />
              </ListItemButton>
            </Link>
          </ListItem>

          {/* View Redacted Files */}
          <ListItem key="view-redacted-files" disablePadding>
            <Link
              to="/view-files"
              component={RouterLink}
              underline="none"
              width="100%"
            >
              <ListItemButton
                sx={{
                  "&.Mui-selected": {
                    bgcolor: theme.palette.primary.light, // Use theme's primary color for selected state
                    color: theme.palette.primary.contrastText,
                  },
                  "&:hover": {
                    bgcolor: theme.palette.primary.main, // Use theme's primary color for hover state
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <ListItemText primary="View Redacted Files" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} /> {/* Divider before Logout */}
        <List>
          {/* Theme Switcher */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleThemeSwitch}>
              <ListItemIcon>
                {isDarkTheme ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
              <ListItemText
                primary={isDarkTheme ? "Dark Mode" : "Light Mode"}
                sx={{ color: theme.palette.text.secondary }}
              />
            </ListItemButton>
          </ListItem>

          {/* Logout */}
          <ListItem disablePadding sx={{ mt: "auto" }}>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ color: theme.palette.text.logout }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
