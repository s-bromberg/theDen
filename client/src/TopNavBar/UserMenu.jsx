import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography, Avatar, Tooltip } from "@mui/material";

const SETTINGS = ['Profile', 'Account', 'Logout'];
export default function UserMenu() {

  const [userAnchor, setUserAnchor] = useState(null);
  const handleOpenUserMenu = e => {
    setUserAnchor(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={userAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(userAnchor)}
        onClose={handleCloseUserMenu}
      >
        {SETTINGS.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: 'center' }}>
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
