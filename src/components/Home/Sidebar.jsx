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
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 1300 }}
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
              <ListItemButton>
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
              <ListItemButton>
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
