import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

// const PAGES = ['Users', 'NFL', 'NBA', 'MLB', 'All Posts'];

export default function MenuSmall({ pages }) {
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
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
