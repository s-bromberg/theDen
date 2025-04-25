import { Box, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export default function Header() {
  return (
    <Container maxWidth="sm">
      <Box component="header" sx={{ textAlign: 'center' }}>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          variant="h1"
          color="textPrimary"
          sx={{ fontFamily: 'orbitron' }}
        >
          THE DEN
        </Link>
      </Box>
      {/* <Box>
        <nav>
          <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </li>
            <li>
              <Link to="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>Posts</Link>
            </li>
          </ul>
        </nav>
      </Box> */}
    </Container>
  );
}
