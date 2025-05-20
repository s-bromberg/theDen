import { Box, Button } from '@mui/material';
import pages from '../pages.js';
import RouterLink from '../RouterLink.jsx';

export default function NavMenuLarge() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map(page => (
        <Button key={page.name} sx={{ my: 2, color: 'white', display: 'block' }}>
          <RouterLink path={page.path}>
            {page.name}
          </RouterLink>
        </Button>
      ))}
    </Box>
  );
}
