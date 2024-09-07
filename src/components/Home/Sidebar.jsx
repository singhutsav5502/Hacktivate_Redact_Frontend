import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Adjust the breakpoint as needed

  const handleToggle = () => setOpen(!open);

  return (
    <>
      {isMobile && (
        <IconButton
          color="primary"
          onClick={handleToggle}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1300 }}
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
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            position: isMobile ? 'relative' : 'fixed', // Fixed on larger screens
            top: 0,
            left: 0,
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'} // Temporary for mobile, persistent for larger screens
      >
        <List>
          <ListItem button component={Link} to="/upload">
            <ListItemText primary="Upload" />
          </ListItem>
          <ListItem button component={Link} to="/view-files">
            <ListItemText primary="View Redacted Files" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
