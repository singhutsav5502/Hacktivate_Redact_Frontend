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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom"; // Import as RouterLink to avoid name conflict

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Adjust the breakpoint as needed

  const handleToggle = () => setOpen(!open);

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
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            position: isMobile ? "relative" : "fixed", // Fixed on larger screens
            top: 0,
            left: 0,
            borderRadius: 0, // Remove border radius
            bgcolor: theme.palette.background.paper, // Use theme's background color
            color: theme.palette.text.primary, // Use theme's text color
          },
        }}
        variant={isMobile ? "temporary" : "persistent"} // Temporary for mobile, persistent for larger screens
      >
        <List>
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
                <ListItemText primary="Upload"/>
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
                <ListItemText primary="View Redacted Files"/>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
