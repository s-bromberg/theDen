import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import pages from '../pages.js';
import RouterLink from '../RouterLink.jsx';

// const PAGES = ['Users', 'NFL', 'NBA', 'MLB', 'All Posts'];

export default function MenuSmall() {
  const [navAnchor, setNavAnchor] = useState(null);

  const handleOpenNavMenu = e => {
    setNavAnchor(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setNavAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={navAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(navAnchor)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {pages.map(page => (
          <MenuItem key={page.name} onClick={handleCloseNavMenu}>
            <Typography sx={{ textAlign: 'center' }}>
              <RouterLink path={page.path}>
                {page.name}
              </RouterLink>

            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
