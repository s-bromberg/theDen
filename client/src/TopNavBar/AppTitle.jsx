import GroupsIcon from '@mui/icons-material/Groups';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

export default function AppTitle() {
  return (
    <>
      <GroupsIcon sx={{ display: 'flex', mr: 1 }} />
      <Typography
        variant={{ xs: 'h5', md: 'h6' }}
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: 'flex',
          flexGrow: { xs: 1, md: 0 },
          fontFamily: 'orbitron, roboto',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        THE DEN
      </Typography>
    </>
  );
}
